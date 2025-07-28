import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      "node_modules/",
      ".astro/",
      "dist/",
      "build/",
      "coverage/",
      "**/*-fixed.*",
      "*.json",
      "*.md"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-useless-escape': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
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
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        describe: 'readonly',
        context: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      }
    },
    rules: {
      'no-undef': 'off',
    }
  },
  {
    files: ['*.config.{js,mjs,cjs}', 'astro.config.mjs', 'jest.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
        URL: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      }
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    }
  },
  ...astro.configs.recommended,
];
