describe('Language Switcher', () => {
  it('switches language and persists after reload', () => {
    cy.visitApp('/');
    cy.get('[data-cy="language-toggle"]').click({ force: true });
    cy.get('blockquote')
      .first()
      .should('contain', 'Kapitalismus je nejplnějším vyjádřením anarchismu');
    cy.reload();
    cy.get('blockquote')
      .first()
      .should('contain', 'Kapitalismus je nejplnějším vyjádřením anarchismu');
    cy.get('[data-cy="language-toggle"]').click({ force: true });
    cy.get('blockquote')
      .first()
      .should('contain', 'Capitalism is the fullest expression of anarchism');
  });
});
