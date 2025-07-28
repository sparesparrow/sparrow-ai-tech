describe('All links & images resolve', () => {
  before(() => {
    cy.visit('/');
  });

  it('internal <a> tags return 200', () => {
    cy.get('a[href^="/"]').each(($a) => {
      const url = $a.prop('href');
      cy.request({ url, failOnStatusCode: false }).its('status').should('eq', 200);
    });
  });

  it('<img> sources load', () => {
    cy.get('img').each(($img) => {
      const src = $img.prop('src');
      cy.request({ url: src, failOnStatusCode: false }).its('status').should('eq', 200);
    });
  });
});
