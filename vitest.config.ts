import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reportsDirectory: './coverage',
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        '**/*.spec.{ts,tsx}/',
        '**/*.test.{ts,tsx}/',
        '**/types/**',
        '**/*.d.ts',

        '**/*.mock.{ts,tsx}/',
        '**/*.mocks.{ts,tsx}/',
        '**/mocks/**',
        '**/__mocks__/**',

        '**/playwright.config.ts',
        '**/vitest.config.ts',
        '**/vitest.setup.ts',
        '**/next.config.ts',
        '**/postcss.config.mjs',
        '**/tailwind.config.ts',
        '**/eslint.config.mjs',
      ],
    },
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'tests/integration/**/*.{test,spec}.{ts,tsx}',
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
