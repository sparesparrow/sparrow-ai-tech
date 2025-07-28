// @ts-nocheck
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4321/',
    setupNodeEvents(on, config) {
      // eslint-disable-next-line no-unused-vars
      on('before:run', (details) => {
        console.log('Cypress tests are starting...');
      });
      return config;
    },
  },
});
