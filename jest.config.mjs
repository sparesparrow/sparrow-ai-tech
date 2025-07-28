import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(astro)$': join(__dirname, 'test/__mocks__/astroStub.js'),
  },
  setupFilesAfterEnv: [join(__dirname, 'jest.setup.js')],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: [
    "node_modules/(?!(.*\\.mjs$|remark-gfm|remark-parse|unified|bail|trough|vfile|vfile-message|is-plain-obj|mdast-util-to-string|mdast-util-gfm|mdast-util-gfm-autolink-literal|mdast-util-gfm-footnote|mdast-util-gfm-strikethrough|mdast-util-gfm-table|mdast-util-gfm-task-list-item|ccount)/)"
  ],
  extensionsToTreatAsEsm: [".jsx"],
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/*.test.mjs"
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },
  // Mock pro import.meta - nastavení přes globals pro jest
  globals: {
    'import.meta': {
      env: {
        BASE_URL: '/',
        NODE_ENV: 'test'
      }
    }
  }
};
