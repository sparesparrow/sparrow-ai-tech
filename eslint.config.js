import js              from '@eslint/js';
import tsPlugin        from '@typescript-eslint/eslint-plugin';
import tsParser        from '@typescript-eslint/parser';
import reactPlugin     from 'eslint-plugin-react';
import jsxA11y         from 'eslint-plugin-jsx-a11y';
import astroPlugin     from 'eslint-plugin-astro';
import cypressPlugin   from 'eslint-plugin-cypress';
import globals         from 'globals';

/*  ─────────────────────────────  Flat-config  ────────────────────────────── */
export default [
  /* Ignore big generated/utility trees */
  { ignores : [
      '.astro/**/*','dist/**/*','node_modules/**/*','build/','coverage/','.nyc_output/',
      'cypress/downloads/','cypress/screenshots/','**/*-fixed.*',
      '*.json','*.md','*.css','*.html','package-lock.json'
  ]},

  /* Base JS/JSX (React without react-hooks plug-in) */
  {
    files  : ['**/*.{js,jsx}'],
    plugins: {react:reactPlugin,'jsx-a11y':jsxA11y},
    languageOptions : {
      parserOptions : {ecmaVersion:'latest',sourceType:'module',ecmaFeatures:{jsx:true}},
      globals       : {...globals.browser,...globals.node}
    },
    rules : {
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope':'off',
      'react/prop-types':'off',
      'no-unused-vars':['warn',{argsIgnorePattern:'^_',varsIgnorePattern:'^_'}],
    },
    settings:{react:{version:'detect'}}
  },

  /* TS / TSX --------------------------------------------------------------- */
  {
    files  : ['**/*.{ts,tsx}'],
    plugins: {'@typescript-eslint':tsPlugin,react:reactPlugin},
    languageOptions:{
      parser:tsParser,
      parserOptions:{ecmaVersion:'latest',sourceType:'module',ecmaFeatures:{jsx:true}},
      globals:{...globals.browser,...globals.node}
    },
    rules:{
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars':['warn',{argsIgnorePattern:'^_'}],
      'react/react-in-jsx-scope':'off',
      'react/prop-types':'off'
    },
    settings:{react:{version:'detect'}}
  },

  /* Astro (very lenient) --------------------------------------------------- */
  {
    files:['**/*.astro'],
    plugins:{astro:astroPlugin},
    languageOptions:{
      parser:astroPlugin.parser,
      parserOptions:{parser:'@typescript-eslint/parser',extraFileExtensions:['.astro']},
      globals:{...globals.browser,...globals.node,Astro:'readonly'}
    },
    rules:{'no-unused-vars':'off','no-undef':'off'}
  },

  /* Cypress E2E ------------------------------------------------------------ */
  {
    files:['cypress/**/*.{js,ts,jsx,tsx}','**/*.cy.{js,ts,jsx,tsx}'],
    plugins:{cypress:cypressPlugin},
    languageOptions:{globals:{...globals.browser,...cypressPlugin.environments.globals.globals}},
    rules:{...cypressPlugin.configs.recommended.rules}
  },

  /* Jest / Vitest unit tests ---------------------------------------------- */
  {
    files:['**/*.test.{js,jsx,ts,tsx}','**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions:{globals:{...globals.jest}}
  }
];
