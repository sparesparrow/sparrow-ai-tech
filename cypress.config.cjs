import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4322/',
    setupNodeEvents(on, config) {
      on('before:run', (details) => {
        console.log('Cypress tests are starting...');
      });
      return config;
    },
  },
});
