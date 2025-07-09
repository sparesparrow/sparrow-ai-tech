describe('API Backend Endpoints', () => {
  it('returns error for missing API key on /api/chatbot', () => {
    cy.request({
      method: 'POST',
      url: '/api/chatbot',
      failOnStatusCode: false,
      body: { message: 'Hello' },
    }).then((response) => {
      expect(response.status).to.be.oneOf([500, 502]);
      expect(response.body).to.have.property('error');
    });
  });

  it('returns error for missing html on /api/pdf', () => {
    cy.request({
      method: 'POST',
      url: '/api/pdf',
      failOnStatusCode: false,
      body: {},
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });
});
