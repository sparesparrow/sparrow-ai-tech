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

  it('should test contact form', () => {
    cy.get('a[href="#contact"]').click();
    cy.get('[data-cy="contact-form"]').should('be.visible');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Test message');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="form-success"]').should('be.visible');
  });
});
