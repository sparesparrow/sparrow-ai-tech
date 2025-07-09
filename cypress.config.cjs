const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    //baseUrl: 'http://localhost:5173/sparrow-ai-tech', // For local dev
    // For production E2E, use:
     baseUrl: 'https://sparesparrow.github.io/sparrow-ai-tech/',
    setupNodeEvents(on, config) {
      // Example: implement node event listeners here
      // You can add custom tasks, plugins, or event handlers for Cypress here.
      // For example, to log when tests start:
      on('before:run', (details) => {
        console.log('Cypress tests are starting...');
      });

      // To add a custom task (uncomment and customize as needed):
      // on('task', {
      //   log(message) {
      //     console.log(message);
      //     return null;
      //   },
      // });

      // Return the config object if you modify it
      return config;
    },
  },
});
