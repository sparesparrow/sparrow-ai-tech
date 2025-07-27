describe('Advanced User Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete full user journey', () => {
    cy.get('[data-cy="main-nav"]').should('be.visible');
    cy.get('a[href="#infographics"]').click();
    cy.get('[data-cy="infographic-link"]').first().should('be.visible');
    cy.get('[data-cy="infographic-link"]').first().click();
    cy.go('back');
    cy.get('a[href="#articles"]').click();
    cy.get('[data-cy="article-link"]').first().should('be.visible');
    cy.get('[data-cy="article-link"]').first().click();
    cy.get('[data-cy="article-modal"]').should('be.visible');
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="article-modal"]').should('not.exist');
  });

  it('should handle language switching', () => {
    cy.get('[data-cy="language-toggle"]').click();
    cy.get('[data-cy="language-toggle"]').should('contain', 'English');
  });

  it('should test dark mode toggle', () => {
    cy.get('[data-cy="dark-mode-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
  });
});
