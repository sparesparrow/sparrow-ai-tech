import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import cypressPlugin from 'eslint-plugin-cypress';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: [
      '.astro/**/*', 'dist/**/*', 'node_modules/**/*', 'build/', 'coverage/',
      '.nyc_output/', 'cypress/downloads/', 'cypress/screenshots/',
      '**/*-fixed.*', 'app.js', 'chatbot-api-fixed.js', 'i18n-fixed.jsx',
      'MermaidLiveEditor-fixed.jsx', '*.json', '*.md', '*.css', '*.html',
      'package-lock.json', 'sparrow_audit_data.json', 'fix-analysis.md'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    },
    settings: {
        react: { version: "detect" }
    }
  },
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    languageOptions: {
      globals: { ...globals.node, ...globals.browser, Astro: 'readonly' },
      parser: astroPlugin.parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      'astro/no-conflict-set-directives': 'warn',
      'astro/no-unused-define-vars-in-style': 'warn',
      'no-unused-vars': 'off',
      'no-undef': 'off'
    },
  },
  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: { ...cypressPlugin.environments.globals.globals }
    },
    rules: cypressPlugin.configs.recommended.rules,
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.jest }
    }
  },
];
