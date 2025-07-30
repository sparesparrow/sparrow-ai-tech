// jest.config.mjs
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
    '\\.(astro)$': new URL('./test/__mocks__/astroStub.js', import.meta.url).pathname,
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
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
};
