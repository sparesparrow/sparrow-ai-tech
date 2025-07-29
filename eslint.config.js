export default [
  {
    files: ['**/*.{js,jsx,astro}'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: { 'no-unused-vars': 'warn', 'no-console': 'warn' },
  },
];
