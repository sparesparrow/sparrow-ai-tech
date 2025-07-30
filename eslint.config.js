import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';

export default [
  // Recommended settings for Astro
  ...(astro.configs?.['flat/recommended'] ?? []),

  // Configuration for JavaScript and JSX files
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        },
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      'react': react,
      'react-hooks': reactHooks
    },
    rules: {
      // General rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',

      // React-specific rules
      'react/react-in-jsx-scope': 'off', // Not needed with modern JSX transform
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Configuration for TypeScript files (no Babel parser for TS)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      'react': react,
      'react-hooks': reactHooks
    },
    rules: {
      // General rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',

      // React-specific rules
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
