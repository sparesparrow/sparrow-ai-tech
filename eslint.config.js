import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import cypress from 'eslint-plugin-cypress';

export default [
  { ignores: ["node_modules/", ".astro/", "dist/"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      cypress: cypress,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'react/display-name': 'off',
      'no-undef': 'warn',
    }
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: { ...globals.cypress }
    }
  }
];
