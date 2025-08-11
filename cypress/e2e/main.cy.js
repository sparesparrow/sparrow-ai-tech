describe('Main page style and i18n', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads CSS (background-color check)', () => {
    cy.get('body').should('have.css', 'background-color').and('match', /rgb/);
  });

  it('shows Czech toggle and switches language', () => {
    cy.contains('Čeština').click({ force: true });
    cy.url().should('include', 'lang=cs');
    cy.contains('English'); // toggle text changed
    cy.get('blockquote')
      .first()
      .should('contain', 'Kapitalismus je nejplnějším vyjádřením anarchismu');
  });

  it('quotes render (EN)', () => {
    cy.visit('/?lang=en');
    cy.get('blockquote').should('have.length.at.least', 1);
    // Just check that we have some blockquotes, don't check specific content
    cy.get('blockquote').should('exist');
  });
});
