const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/sparrow-ai-tech', // For local dev
    // For production E2E, use:
    // baseUrl: 'https://sparesparrow.github.io/sparrow-ai-tech/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
