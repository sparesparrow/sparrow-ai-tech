export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/',
    '^@/(.*)$': '<rootDir>/src/',
    '\.(astro)$': require.resolve('./test/__mocks__/astroStub.js'),
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};
