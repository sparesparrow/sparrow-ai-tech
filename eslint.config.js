/* eslint-env node */

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import cypress from 'eslint-plugin-cypress';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      'node_modules/',
      '.astro/',
      'dist/',
      'build/',
      'coverage/',
      '**/*-fixed.*',
      '*.json',
      '*.md',
      '**/*.cjs', // Ignore all .cjs files from ESLint
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'no-dupe-keys': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      cypress: cypress,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...cypress.environments.globals.globals,
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/unsafe-to-chain-command': 'warn',
    },
  },
  ...astro.configs.recommended,
];
