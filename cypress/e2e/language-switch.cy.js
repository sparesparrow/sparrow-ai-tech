describe('Language Switcher', () => {
  it('switches language and persists after reload', () => {
    cy.visitApp('/');
    cy.get('[data-cy="language-toggle"]').click();
    cy.contains('Domů').should('exist'); // Czech for Home
    cy.reload();
    cy.contains('Domů').should('exist');
    cy.get('[data-cy="language-toggle"]').click();
    cy.contains('Home').should('exist');
  });
}); 