import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import cypress from 'eslint-plugin-cypress';
import astro from 'eslint-plugin
    ignores: ['node_modules/', 'dist/', '.astro/', 'coverage/', '**/*-fixed.*', '*.json', '*.md']
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
        // Browser globals - use "readonly" instead of spreading globals.browser
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_', 
        varsIgnorePattern: '^_' 
      }],
      'no-useless-escape': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['astro'] }]
    }
  },
  {
    files: ['cypress/**/*.{js,ts}', '**/*.cy.{js,ts}'],
    plugins: {
      cypress: cypress,
    },
    languageOptions: {
      globals: {
        // Cypress globals
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
        // Browser globals for Cypress
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      }
    },
    rules: {
      ...cypress.configs.recommended.rules,
    }
  },
  ...astro.configs.recommended
];
