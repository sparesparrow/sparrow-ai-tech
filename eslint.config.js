import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: [
      '.astro/**/*', 'dist/**/*', 'node_modules/**/*', 'build/', 'coverage/',
      '.nyc_output/', 'cypress/downloads/', 'cypress/screenshots/',
      '**/*-fixed.*', 'app.js', 'chatbot-api-fixed.js', 'i18n-fixed.jsx',
      'MermaidLiveEditor-fixed.jsx', '*.json', '*.md', '*.css', '*.html',
      '*.min.js', '*.bundle.js', 'package-*.json', 'sparrow_audit_data.json',
      'fix-analysis.md', 'tailwind-config-fixed.js', 'content-config-fixed.ts'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    }
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.jest }
    }
  }
];
