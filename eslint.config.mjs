import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default antfu(
  {
    react: true,
    typescript: true,
    stylistic: {
      semi: true,
    },

    formatters: {
      css: true,
    },

    ignores: [
      'docs/**/*',
      'messages/**/*',
      'openapi/**/*',
    ],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          sortSideEffects: false, // keep effect imports
        },
      ],
      'node/prefer-global/process': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  jsxA11y.flatConfigs.recommended,
);
