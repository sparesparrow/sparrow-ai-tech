/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4321/',
    setupNodeEvents(on, config) {
      on('before:run', (details) => {
        // Implementace těla: Zalogování detailů běhu pro debugging
        console.log('Cypress before:run details:');
        console.log('Browser:', details.browser);
        console.log('Specs:', details.specs);
        console.log('Cypress version:', details.cypressVersion);
        console.log('System info:', details.system);
        // Zde můžete přidat další logiku, např. nastavení prostředí nebo reportování
        // Např.: if (details.browser.name === 'chrome') { /* speciální nastavení */ }
      });
      return config;
    },
  },
});
