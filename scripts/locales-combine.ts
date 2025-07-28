import 'dotenv/config';
import { glob } from 'glob';
import fs from 'node:fs';
import nodePath from 'node:path';

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;

const MESSAGES_DIR = nodePath.resolve(process.cwd(), 'messages');
const TARGET_DIR = nodePath.resolve(process.cwd(), 'messages', '@target');
const DEFAULT_LOCALE = process.env.NEXT_I18N_DEFAULT || '';
const SUPPORTED_LOCALES = process.env.NEXT_I18N_LOCALES?.split(',') || [];
const ROUTING_FILE = nodePath.resolve(process.cwd(), 'src', 'lib', 'i18n', 'routing.ts');

const COLORS = {
  reset: '\x1B[0m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
};

// Helper: clean target directory
function cleanTargetDirectory(): void {
  console.log(`${COLORS.cyan}Cleaning target directory...${COLORS.reset}`);

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(`${COLORS.green}✓ Created target directory: ${TARGET_DIR}${COLORS.reset}`);
    return;
  }

  try {
    const files = fs.readdirSync(TARGET_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    for (const file of jsonFiles) {
      const filePath = nodePath.join(TARGET_DIR, file);
      fs.unlinkSync(filePath);
      console.log(`${COLORS.green}✓ Deleted old file: ${file}${COLORS.reset}`);
    }

    if (jsonFiles.length === 0) {
      console.log(`${COLORS.blue}Target directory is already clean or has no JSON files.${COLORS.reset}`);
    }
  }
  catch (error) {
    console.error(`${COLORS.red}Error while cleaning target directory:${COLORS.reset}`, error);
    throw error;
  }
}

// Helper: validate configuration and directory structure
function validateConfiguration(): boolean {
  console.log(`${COLORS.cyan}Validating configuration...${COLORS.reset}`);

  if (!DEFAULT_LOCALE) {
    console.error(`${COLORS.red}Error: DEFAULT_LOCALE is not configured.${COLORS.reset}`);
    return false;
  }

  if (!SUPPORTED_LOCALES || SUPPORTED_LOCALES.length === 0) {
    console.error(`${COLORS.red}Error: SUPPORTED_LOCALES is not configured or is empty.${COLORS.reset}`);
    return false;
  }

  if (SUPPORTED_LOCALES[0] !== DEFAULT_LOCALE) {
    console.error(
      `${COLORS.red}Error: The first item in SUPPORTED_LOCALES ("${SUPPORTED_LOCALES[0]}") is not the DEFAULT_LOCALE ("${DEFAULT_LOCALE}").${COLORS.reset}\n`
      + `  Ensure the default locale is the first in the SUPPORTED_LOCALES array.`,
    );
    return false;
  }

  if (!fs.existsSync(MESSAGES_DIR)) {
    console.error(`${COLORS.red}Error: Message directory "${MESSAGES_DIR}" does not exist.${COLORS.reset}`);
    return false;
  }

  const missingDirs: string[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const localeDir = nodePath.join(MESSAGES_DIR, locale);
    if (!fs.existsSync(localeDir)) {
      missingDirs.push(locale);
    }
  }

  if (missingDirs.length > 0) {
    console.error(
      `${COLORS.red}Error: Missing directories for locales: ${missingDirs.join(', ')}${COLORS.reset}\n`
      + `  Please ensure each configured locale has a corresponding directory.`,
    );
    return false;
  }

  console.log(`${COLORS.green}✓ Configuration validated successfully${COLORS.reset}`);
  return true;
}

// Helper: deep merge objects
function deepMerge<T extends Record<string, any>>(target: T, source: DeepPartial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (source[key] === undefined)
      continue;

    if (
      typeof source[key] === 'object'
      && source[key] !== null
      && !Array.isArray(source[key])
      && typeof target[key] === 'object'
      && target[key] !== null
      && !Array.isArray(target[key])
    ) {
      output[key] = deepMerge(target[key], source[key] as any);
    }
    else {
      output[key] = source[key] as any;
    }
  }

  return output;
}

// Helper: check key conflicts between translation files
function checkConflicts(
  locale: string,
  filePath: string,
  existingTranslations: Record<string, any>,
  newTranslations: Record<string, any>,
  keyPath = '',
): void {
  for (const key in newTranslations) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;

    if (
      key in existingTranslations
      && typeof existingTranslations[key] === 'object'
      && typeof newTranslations[key] === 'object'
    ) {
      checkConflicts(
        locale,
        filePath,
        existingTranslations[key],
        newTranslations[key],
        currentPath,
      );
    }
    else if (
      key in existingTranslations
      && JSON.stringify(existingTranslations[key]) !== JSON.stringify(newTranslations[key])
    ) {
      console.warn(
        `${COLORS.yellow}Warning: Conflict detected in locale "${locale}" for key "${currentPath}".${COLORS.reset}\n`
        + `  Existing value: ${JSON.stringify(existingTranslations[key])}\n`
        + `  New value from ${nodePath.basename(filePath)}: ${JSON.stringify(newTranslations[key])}\n`
        + `  Using the new value.`,
      );
    }
  }
}

// Helper: validate JSON file structure
function validateLanguageFile(filePath: string, translations: Record<string, any>): boolean {
  const filename = nodePath.basename(filePath, '.json');
  const keys = Object.keys(translations);
  if (keys.length !== 1) {
    console.error(
      `${COLORS.red}Error: File ${filePath} must have exactly one top-level key, but found ${keys.length}.${COLORS.reset}\n`
      + `  Each file should have a top-level key matching the filename.`,
    );
    return false;
  }

  const key = keys[0];
  if (key !== filename) {
    console.error(
      `${COLORS.red}Error: Top-level key "${key}" in file ${filePath} does not match filename "${filename}".${COLORS.reset}\n`
      + `  Top-level key must match the filename.`,
    );
    return false;
  }

  return true;
}

// Helper: compare translation structure between default and target locale
function compareTranslationStructure(
  defaultTranslations: Record<string, any>,
  translations: Record<string, any>,
  locale: string,
  keyPath = '',
  loggedMissingKeys = new Set<string>(), // Add this parameter to track logged keys
): { missing: Record<string, any>; extra: string[] } {
  const missing: Record<string, any> = {};
  const extra: string[] = [];

  for (const key in defaultTranslations) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;

    if (!(key in translations)) {
      // Only log if we haven't logged this path before
      if (!loggedMissingKeys.has(currentPath)) {
        console.warn(
          `${COLORS.yellow}Warning: Missing translation for key "${currentPath}" in locale "${locale}".${COLORS.reset}\n`
          + `  Using fallback value from default locale (${DEFAULT_LOCALE}).`,
        );
        loggedMissingKeys.add(currentPath);
      }
      missing[key] = defaultTranslations[key];
    }
    else if (
      typeof defaultTranslations[key] === 'object'
      && defaultTranslations[key] !== null
      && typeof translations[key] === 'object'
      && translations[key] !== null
    ) {
      const nested = compareTranslationStructure(
        defaultTranslations[key],
        translations[key],
        locale,
        currentPath,
        loggedMissingKeys, // Pass the set to recursive calls
      );
      if (Object.keys(nested.missing).length > 0) {
        missing[key] = nested.missing;
      }
      extra.push(...nested.extra);
    }
  }

  for (const key in translations) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;

    if (!(key in defaultTranslations)) {
      console.warn(
        `${COLORS.yellow}Warning: Extra key "${currentPath}" found in locale "${locale}".${COLORS.reset}\n`
        + `  This key does not exist in the default locale and will be ignored.`,
      );
      extra.push(currentPath);
    }
    else if (
      typeof defaultTranslations[key] === 'object'
      && defaultTranslations[key] !== null
      && typeof translations[key] === 'object'
      && translations[key] !== null
    ) {
      const nested = compareTranslationStructure(
        defaultTranslations[key],
        translations[key],
        locale,
        currentPath,
        loggedMissingKeys, // Pass the set to recursive calls
      );
      extra.push(...nested.extra);
    }
  }

  return { missing, extra };
}

// Helper: process and merge files for a single locale
async function processLocaleFiles(locale: string): Promise<Record<string, any>> {
  console.log(`${COLORS.blue}Processing locale: ${locale}${COLORS.reset}`);

  const localeDir = nodePath.join(MESSAGES_DIR, locale);
  const files = await glob(`${localeDir}/**/*.json`);

  if (files.length === 0) {
    console.warn(`${COLORS.yellow}Warning: No JSON files found for locale "${locale}".${COLORS.reset}`);
    return {};
  }

  let combined: Record<string, any> = {};

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const translations = JSON.parse(content);

      if (!validateLanguageFile(file, translations)) {
        console.warn(`${COLORS.red}Skipped invalid file: ${file}${COLORS.reset}`);
        continue;
      }

      checkConflicts(locale, file, combined, translations);
      combined = deepMerge(combined, translations);

      console.log(`${COLORS.green}✓ Processed: ${file}${COLORS.reset}`);
    }
    catch (error) {
      console.error(`${COLORS.red}Error processing file ${file}:${COLORS.reset}`, error);
    }
  }

  return combined;
}

// Helper: update routing file with new locale configuration
function updateRoutingFile(): void {
  console.log(`${COLORS.cyan}Updating routing file...${COLORS.reset}`);

  if (!fs.existsSync(ROUTING_FILE)) {
    console.warn(`${COLORS.yellow}Warning: Routing file not found at ${ROUTING_FILE}${COLORS.reset}`);
    return;
  }

  try {
    const content = fs.readFileSync(ROUTING_FILE, 'utf8');

    // Generate the locales array string
    const localesString = `[${SUPPORTED_LOCALES.map(locale => `'${locale}'`).join(', ')}]`;

    // Update locales array - matches both single and multi-line formats
    let updatedContent = content.replace(
      /locales:\s*\[[\s\S]*?\]/,
      `locales: ${localesString}`,
    );

    // Update defaultLocale
    updatedContent = updatedContent.replace(
      /defaultLocale:\s*'[^']*'/,
      `defaultLocale: '${DEFAULT_LOCALE}'`,
    );

    // Check if any changes were made
    if (updatedContent === content) {
      console.log(`${COLORS.blue}No changes needed in routing file.${COLORS.reset}`);
      return;
    }

    // Write the updated content back to the file
    fs.writeFileSync(ROUTING_FILE, updatedContent);

    console.log(`${COLORS.green}✓ Updated routing file with:${COLORS.reset}`);
    console.log(`  - locales: ${localesString}`);
    console.log(`  - defaultLocale: '${DEFAULT_LOCALE}'`);
  }
  catch (error) {
    console.error(`${COLORS.red}Error updating routing file:${COLORS.reset}`, error);
  }
}

// Main function
async function combineLocaleFiles(): Promise<void> {
  console.log(`${COLORS.cyan}Starting locale file merge...${COLORS.reset}`);

  cleanTargetDirectory();

  if (!validateConfiguration()) {
    console.error(`${COLORS.red}Configuration validation failed. Aborting.${COLORS.reset}`);
    return;
  }

  console.log(`${COLORS.cyan}Processing default locale: ${DEFAULT_LOCALE}${COLORS.reset}`);
  const defaultTranslations = await processLocaleFiles(DEFAULT_LOCALE);

  if (Object.keys(defaultTranslations).length === 0) {
    console.error(`${COLORS.red}Error: No valid files found for default locale "${DEFAULT_LOCALE}".${COLORS.reset}`);
    return;
  }

  const defaultOutputFile = nodePath.join(TARGET_DIR, `${DEFAULT_LOCALE}.json`);
  try {
    fs.writeFileSync(defaultOutputFile, `${JSON.stringify(defaultTranslations, null, 2)}\n`);
    console.log(`${COLORS.green}✓ Wrote default locale: ${defaultOutputFile}${COLORS.reset}`);
  }
  catch (error) {
    console.error(`${COLORS.red}Error writing default locale file:${COLORS.reset}`, error);
    return;
  }

  let allLocalesProcessed = true;

  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE)
      continue;

    console.log(`${COLORS.cyan}Processing locale: ${locale}${COLORS.reset}`);

    let localeTranslations = await processLocaleFiles(locale);

    const structure = compareTranslationStructure(
      defaultTranslations,
      localeTranslations,
      locale,
    );

    if (Object.keys(structure.missing).length > 0) {
      localeTranslations = deepMerge(localeTranslations, structure.missing);
    }

    if (Object.keys(localeTranslations).length === 0) {
      console.warn(`${COLORS.yellow}Warning: Locale "${locale}" is empty. Using default structure.${COLORS.reset}`);
      localeTranslations = defaultTranslations;
    }

    const outputFile = nodePath.join(TARGET_DIR, `${locale}.json`);
    try {
      fs.writeFileSync(outputFile, `${JSON.stringify(localeTranslations, null, 2)}\n`);
      console.log(`${COLORS.green}✓ Wrote locale file: ${outputFile}${COLORS.reset}`);
    }
    catch (error) {
      console.error(`${COLORS.red}Error writing locale file ${outputFile}:${COLORS.reset}`, error);
      allLocalesProcessed = false;
    }
  }

  // Update routing file only if all locales were processed successfully
  if (allLocalesProcessed) {
    updateRoutingFile();
  }
  else {
    console.warn(`${COLORS.yellow}Skipping routing file update due to errors in locale processing.${COLORS.reset}`);
  }

  console.log(`${COLORS.cyan}Locale file merge complete.${COLORS.reset}`);
}

// Watch mode
async function watchLocaleFiles(): Promise<void> {
  console.log(`${COLORS.cyan}Starting watch mode for locale files...${COLORS.reset}`);

  await combineLocaleFiles();

  for (const locale of SUPPORTED_LOCALES) {
    const localeDir = nodePath.join(MESSAGES_DIR, locale);

    if (!fs.existsSync(localeDir)) {
      continue;
    }

    fs.watch(localeDir, { recursive: true }, async (eventType, filename) => {
      if (filename && filename.endsWith('.json')) {
        console.log(`${COLORS.magenta}Change detected in ${locale}/${filename}, remerging...${COLORS.reset}`);
        await combineLocaleFiles();
      }
    });

    console.log(`${COLORS.blue}Watching: ${localeDir}${COLORS.reset}`);
  }
}

(async function main() {
  const watchMode = process.argv.includes('--watch') || process.argv.includes('-w');

  if (watchMode) {
    await watchLocaleFiles();
  }
  else {
    await combineLocaleFiles();
  }
})().catch((error) => {
  console.error(`${COLORS.red}Fatal error:${COLORS.reset}`, error);
  process.exit(1);
});
