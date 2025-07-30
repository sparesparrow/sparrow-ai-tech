import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Global ignores
  {
    ignores: [
      '.astro/',
      'dist/',
      'node_modules/',
      'build/',
      '_site/',
      'public/',
      'cypress/downloads/',
      'cypress/screenshots/',
      'cypress/videos/',
      '**/*.astro'  // Skip Astro files entirely from ESLint
    ],
  },

  // Base JavaScript configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',

        // Node.js globals  
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'no-console': 'warn',
      'no-useless-escape': 'warn'
    }
  },

  // JSX configuration
  {
    files: ['**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        },
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Browser globals
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',

        // React globals
        React: 'readonly'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'no-console': 'warn',
      'no-useless-escape': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Cypress test files
  {
    files: ['cypress/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        // Cypress globals
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        before: 'readonly',
        afterEach: 'readonly',
        after: 'readonly',
        context: 'readonly'
      }
    }
  },

  // Jest/Test files
  {
    files: ['**/*.test.{js,jsx}', '**/__tests__/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        beforeAll: 'readonly',
        afterEach: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        global: 'readonly'
      }
    }
  },

  // API/Server files
  {
    files: ['src/pages/api/**/*.js', 'src/api/**/*.js'],
    languageOptions: {
      globals: {
        // Server/API globals
        Response: 'readonly',
        Request: 'readonly',
        fetch: 'readonly'
      }
    }
  },

  // Tailwind config
  {
    files: ['tailwind.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly'
      }
    }
  }
];
