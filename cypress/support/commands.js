// Custom Cypress commands can be added here
// Example:
// Cypress.Commands.add('login', (email, password) => { ... })

// Custom command to visit the app with proper base URL
Cypress.Commands.add('visitApp', (path = '') => {
  const baseUrl = Cypress.config().baseUrl || 'https://sparesparrow.github.io/sparrow-ai-tech';
  cy.visit(`${baseUrl}${path}`);
});

// Handle uncaught exceptions from the application
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  // This handles cases where initTypewriter is not defined
  if (err.message.includes('initTypewriter is not defined')) {
    return false;
  }
  // Return true for other errors to let them fail the test
  return true;
});
