import '@testing-library/jest-dom';

// Mock for Astro components
global.Astro = {
  props: {},
  request: {
    url: 'http://localhost:3000/',
  },
  site: new URL('http://localhost:3000/'),
  url: new URL('http://localhost:3000/'),
};

// Mock import.meta globally for all tests
global.importMeta = {
  env: {
    BASE_URL: '/sparrow-ai-tech'
  }
};

// Set process.env for tests
process.env.BASE_URL = '/sparrow-ai-tech';

// Mock for window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
