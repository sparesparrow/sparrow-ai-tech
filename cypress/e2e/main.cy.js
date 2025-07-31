describe('Main page style and i18n', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads CSS (background-color check)', () => {
    cy.get('body').should('have.css', 'background-color').and('match', /rgb/);
  });

  it('shows Czech toggle and switches language', () => {
    cy.contains('Čeština').click();
    cy.url().should('include', 'lang=cs');
    cy.contains('English'); // toggle text changed
    cy.contains('Filozofie'); // Czech heading
    cy.get('.quote-text').first().should('contain', 'Stát svou existencí');
  });

  it('quotes render (EN)', () => {
    cy.visit('/?lang=en');
    cy.contains('Philosophy').should('not.exist'); // section title stays Czech but content english quotes
    cy.get('.quote-text').first().should('contain', 'The state distorts education');
  });
});
