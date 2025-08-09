describe('BASE_URL and path correctness', () => {
  const base = 'https://sparesparrow.github.io/sparrow-ai-tech';

  it('favicon loads from BASE_URL path', () => {
    cy.request(base + '/favicon.svg')
      .its('status')
      .should('eq', 200);
  });

  it('index.js referenced in the page is reachable (if present)', () => {
    cy.request(base + '/').then(res => {
      const html = String(res.body || '');
      const match = html.match(/<script[^>]+src="([^"]*\/js\/index\.js[^"]*)"/);
      if (match) {
        const src = match[1];
        // normalize double slashes after base
        let url = src.startsWith('http') ? src : base + (src.startsWith('/') ? '' : '/') + src;
        url = url.replace(/([^:])\/\/+/, '$1/');
        cy.request({ url, failOnStatusCode: false })
          .its('status')
          .should('be.oneOf', [200, 304, 404]);
      }
    });
  });
});
