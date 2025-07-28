
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:astro/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: { ecmaVersion: 2023, sourceType: 'module' },
    settings: { react: { version: 'detect' } },

    overrides: [
        // Astro
        {
            files: ['*.astro'],
            parser: 'astro-eslint-parser',
            parserOptions: { parser: '@typescript-eslint/parser' },
            env: { browser: true, es2023: true },
            rules: { 'react/react-in-jsx-scope': 'off' }
        },

        // Node-side config files
        {
            files: ['*.cjs', 'astro.config.mjs', 'babel.config.cjs'],
            env: { node: true, es2023: true },
            parserOptions: { sourceType: 'script' } // CommonJS
        },

        // Cypress tests
        {
            files: ['cypress/**/*.{js,ts}'],
            env: { 'cypress/globals': true }
        }
    ]
};
