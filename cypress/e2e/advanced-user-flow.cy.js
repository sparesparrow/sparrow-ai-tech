// Advanced Cypress E2E tests for Sparrow AI Tech

describe('Advanced User Flows', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates through the main sections and persists state', () => {
    // Go to Portfolio
    cy.get('a').contains(/portfolio/i).click();
    cy.url().should('include', '#portfolio');
    cy.contains(/projects/i);

    // Go to Articles and open an article
    cy.get('a').contains(/articles/i).click();
    cy.url().should('include', '#articles');
    cy.get('a').contains(/hexagonal architecture/i).should('have.attr', 'href');

    // Go to Infographics and open one
    cy.get('a').contains(/infographics/i).click();
    cy.url().should('include', '#infographics');
    cy.get('a').contains(/MCP Ecosystem/i).click({force:true});
    cy.url().should('include', '/infographics/1');
    cy.contains(/MCP Ecosystem/i);
  });

  it.skip('handles API/network errors gracefully', () => {
    cy.intercept('GET', '/api/some-endpoint', { statusCode: 500 }).as('getApi');
    cy.visit('/');
    cy.wait('@getApi');
    cy.contains(/error/i).should('be.visible');
  });

  it('checks accessibility on the homepage', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it('works correctly on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    cy.get('button').contains(/menu/i).click({force:true});
    cy.get('nav').should('be.visible');
  });

  it.skip('tests form validation and submission', () => {
    cy.visit('/contact');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('form').submit();
    cy.contains(/invalid email/i).should('be.visible');
    cy.get('input[name="email"]').clear().type('user@example.com');
    cy.get('textarea[name="message"]').type('Hello!');
    cy.get('form').submit();
    cy.contains(/thank you/i).should('be.visible');
  });
}); 