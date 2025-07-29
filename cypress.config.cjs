const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    /* Update the URL below if your dev server differs */
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    }
  }
});
