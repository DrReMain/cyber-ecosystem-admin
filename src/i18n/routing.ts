import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // ============ Required Configuration ============
  locales: (process.env.NEXT_PUBLIC_I18N_LOCALES || '').split(','),
  defaultLocale: process.env.NEXT_PUBLIC_I18N_DEFAULT || '',

  // ============ Language Detection Configuration ============

  /**
   * Whether to enable automatic language detection
   * Default: true
   * When enabled, the user's language is automatically detected based on the Accept-Language header, cookies, etc.
   */
  localeDetection: true,

  // ============ URL Prefix Configuration ============

  /**
   * Language prefix mode
   * Default: 'always'
   * Options:
   * - 'always': Prefix is shown for all languages (/zh-CN/page, /en-US/page)
   * - 'as-needed': No prefix for the default language (/page, /en-US/page)
   * - 'never': No prefix for any language (language must be handled some other way)
   */
  localePrefix: 'always',

  // ============ Alternate Links Configuration ============

  /**
   * Whether to generate alternate language links
   * Default: true
   * Used for SEO optimization, generates hreflang links in the HTML head
   */
  alternateLinks: true,
});
