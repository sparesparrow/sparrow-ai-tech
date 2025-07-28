import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  testEnvironment: 'jsdom',
  preset: undefined, // Disable any preset that might conflict

  // Enable ESM support
  extensionsToTreatAsEsm: ['.jsx'],

  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'mjs'],

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
      ]
    }],
    '^.+\\.mjs$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
      ]
    }]
  },

  // Module name mapping
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Setup files
  setupFilesAfterEnv: [join(__dirname, 'jest.setup.js')],

  // Test patterns
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/*.test.mjs"
  ],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],

  // Transform ignore patterns for ESM modules
  transformIgnorePatterns: [
    "node_modules/(?!(.*\\.mjs$|remark-gfm|remark-parse|unified|bail|trough|vfile|vfile-message|is-plain-obj|mdast-util-to-string|mdast-util-gfm|mdast-util-gfm-autolink-literal|mdast-util-gfm-footnote|mdast-util-gfm-strikethrough|mdast-util-gfm-table|mdast-util-gfm-task-list-item|ccount)/)"
  ],

  // Coverage
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },

  // Globals for import.meta support
  globals: {
    'import.meta': {
      env: {
        BASE_URL: '/'
      }
    }
  }
};
