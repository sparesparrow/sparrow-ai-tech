describe('FastAPI health', () => {
  it('/validate_syntax returns valid', () => {
    cy.request('POST', 'http://localhost:8000/validate_syntax', {
      mermaid_code: 'graph TD;A-->B;',
    })
      .its('body.valid')
      .should('eq', true);
  });
});
