describe('Chatbot', () => {
  it('opens chatbot, sends a message, and receives a response', () => {
    cy.visit('/');
    cy.get('[data-cy="chatbot-button"]').click();
    cy.get('[data-cy="chatbot-modal"]').should('be.visible');
    cy.get('[data-cy="chatbot-input"]').type('Hello!{enter}');
    cy.get('[data-cy="chatbot-response"]').should('exist');
  });
  it('handles API error gracefully', () => {
    cy.visit('/');
    cy.get('[data-cy="chatbot-button"]').click();
    cy.get('[data-cy="chatbot-input"]').type('Error test');
    cy.intercept('POST', '/api/chatbot', { statusCode: 500, body: { error: 'Failed' } }).as('chatError');
    cy.get('[data-cy="chatbot-send"]').click();
    cy.wait('@chatError');
    cy.contains('Error').should('exist');
  });
}); 