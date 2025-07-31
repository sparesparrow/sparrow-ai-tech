const _base = '/sparrow-ai-tech';

describe('Base URL Path Validation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have correct base path in all navigation links', () => {
    cy.get('nav a[href]').each(($el) => {
      const href = $el.attr('href');
      if (href.startsWith('/sparrow-ai-tech')) {
        expect(href).to.match(/^\/sparrow-ai-tech\//);
      }
    });
  });

  it('should load assets with correct base path', () => {
    cy.get('img[src]').each(($el) => {
      const src = $el.attr('src');
      if (src.startsWith('/sparrow-ai-tech')) {
        expect(src).to.match(/^\/sparrow-ai-tech\//);
      }
    });
  });

  it('should have working infographic links', () => {
    cy.get('a[href*="infographics"]').should('have.length.gte', 1);
    cy.get('a[href*="infographics"]')
      .first()
      .should('have.attr', 'href')
      .and('include', '/sparrow-ai-tech/');
  });
});
