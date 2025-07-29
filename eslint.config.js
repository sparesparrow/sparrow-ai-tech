import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['**/*.js', '**/*.mjs', '**/*.jsx'],
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
      'jsx-a11y': jsxA11y
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'jsx-a11y/alt-text': 'error'
    }
  },
  ...eslintPluginAstro.configs.recommended
];
