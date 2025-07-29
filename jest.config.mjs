/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    /* Mock CSS modules and alias @/ to src/ */
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
