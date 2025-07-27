import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astroEslint from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: [
      '.astro/**/*',
      'dist/**/*',
      'node_modules/**/*',
      'build/',
      'coverage/',
      '.nyc_output/',
      'cypress/downloads/',
      'cypress/screenshots/',
      '**/*-fixed.*',
      'app.js',
      'chatbot-api-fixed.js',
      'i18n-fixed.jsx',
      'MermaidLiveEditor-fixed.jsx',
      '*.json',
      '*.md',
      '*.css',
      '*.html',
      '*.min.js',
      '*.bundle.js',
      'package-*.json',
      'sparrow_audit_data.json',
      'fix-analysis.md',
    ],
  },

  // Base JS/JSX config
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },

  // TypeScript config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  // Astro config
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroEslint,
    },
    languageOptions: {
      parser: astroEslint.parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      globals: {
        ...globals.browser,
        Astro: 'readonly',
      },
    },
    rules: {
      ...astroEslint.configs.recommended.rules,
    },
  },

  // Cypress config
  {
    files: ['cypress/**/*.{js,ts}', '**/*.cy.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
    },
  },
];
