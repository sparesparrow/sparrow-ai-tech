import babelParser from '@babel/eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // Globální ignorování souborů
  {
    ignores: [
      // Build a systémové složky
      '.astro/',
      'dist/',
      'node_modules/',
      'build/',
      '_site/',
      
      // Astro soubory (mají vlastní TypeScript kontrolu)
      '**/*.astro',
      
      // Cypress a testovací soubory (mají jiné požadavky)
      'cypress/downloads/',
      'cypress/screenshots/', 
      'cypress/videos/',
      
      // Minimalizované soubory
      '**/*.min.js',
      '**/*.bundle.js',
      
      // Veřejné statické soubory
      'public/**/*'
    ],
  },

  // Základní JavaScript konfigurace
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globály
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
        Response: 'readonly',
        Request: 'readonly',

        // Node.js globály pro config soubory
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

  // JSX/React komponenty
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
        // Browser globály pro React komponenty
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
        React: 'readonly'
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    rules: {
      // Použít standardní ESLint pravidlo místo TypeScript verze pro JSX soubory
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

  // TypeScript soubory (pokud existují)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'no-console': 'warn',
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

  // Cypress testovací soubory
  {
    files: ['cypress/**/*.{js,jsx}', 'cypress/**/*.cy.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Cypress globály
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        before: 'readonly',
        afterEach: 'readonly',
        after: 'readonly',
        context: 'readonly',
        
        // Browser globály pro Cypress
        window: 'readonly',
        document: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }]
    }
  },

  // Jest a testovací soubory
  {
    files: ['**/*.test.{js,jsx}', '**/__tests__/**/*.{js,jsx}', 'src/api/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Jest globály
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
    },
    rules: {
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }]
    }
  },

  // API routes (server-side kód)
  {
    files: ['src/pages/api/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Server-side globály
        Response: 'readonly',
        Request: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        global: 'readonly'
      }
    }
  },

  // Konfigurační soubory
  {
    files: ['tailwind.config.js', '*.config.js', '*.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly'
      }
    }
  }
];
