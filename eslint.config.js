import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import cypress from 'eslint-plugin-cypress';
import astroEslintParser from 'astro-eslint-parser';
import * as astroPlugin from 'eslint-plugin-astro';

export default [
  {
    ignores: ['node_modules/', 'dist/', '.astro/', 'coverage/', '**/*-fixed.*', '*.json', '*.md'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: react,
    },
    languageOptions: {
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        localStorage: 'readonly',
        globalThis: 'readonly',
        // Node.js globals
        process: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
        fetch: 'readonly',
        Response: 'readonly',
        navigator: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-useless-escape': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['astro'] }],
      'react/prop-types': 'off',
      'no-undef': 'off', // Disabled for API files with custom environments
    },
  },
  // Astro files configuration
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['cypress/**/*.{js,ts}', '**/*.cy.{js,ts}'],
    plugins: {
      cypress: cypress,
    },
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
  },
];
