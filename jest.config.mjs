export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
    '^.+\\.astro$': '<rootDir>/test/__mocks__/astroStub.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'astro'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/?(*.)(test|spec).(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.(js|jsx|ts|tsx)',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/node_modules/**',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/dist/',
    '<rootDir>/cypress/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@astrojs))',
  ],
  globals: {
    'import.meta': {
      env: {
        BASE_URL: '/sparrow-ai-tech',
        NODE_ENV: 'test'
      }
    }
  },
  passWithNoTests: true,
  verbose: true,
};
