import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Global ignores
  {
    ignores: ['.astro/', 'dist/', 'node_modules/', 'public/build/', 'build/', '_site/'],
  },

  // Astro recommended settings
  ...(astro.configs?.['flat/recommended'] ?? []),

  // React/JSX configuration
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'jsx-a11y/alt-text': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
