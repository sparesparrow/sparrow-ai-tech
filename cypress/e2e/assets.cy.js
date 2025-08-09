describe('Assets and meta validation (post-build)', () => {
  const base = 'https://sparesparrow.github.io/sparrow-ai-tech';

  beforeEach(() => {
    cy.visit(base + '/');
  });

  it('has no double-slash path segments in critical asset links', () => {
    cy.on('uncaught:exception', () => false);
    // detect //css, //js, //_astro after the base prefix
    const badPatterns = [/\/\/styles\//, /\/\/js\//, /\/\/_astro\//];

    cy.get('link[rel="stylesheet"], script[src]').each($el => {
      const attr = $el.is('link') ? 'href' : 'src';
      const val = $el.attr(attr) || '';
      // allow protocol (https://) but detect double slash after base path
      const afterOrigin = val.replace(/^https?:\/\/[^/]+/, '');
      badPatterns.forEach(re => {
        expect(re.test(afterOrigin), `${attr} has double slash: ${val}`).to.be.false;
      });
    });
  });

  it('main stylesheet responds with 200', () => {
    // find a stylesheet that ends with /css/main.css or contains main.css
    cy.get('link[rel="stylesheet"]').then($links => {
      const main = [...$links]
        .map(l => l.getAttribute('href') || '')
        .find(h => /\/styles\/main\.css(\?|$)/.test(h));
      expect(main, 'main.css link present').to.be.a('string');
      cy.wrap(main).then(url => {
        cy.request(url).its('status').should('eq', 200);
      });
    });
  });

  it('og-image is reachable', () => {
    cy.get('meta[property="og:image"]')
      .should('have.attr', 'content')
      .then(url => {
        cy.request(String(url)).its('status').should('eq', 200);
      });
  });

  it('no console errors on load', () => {
    cy.window().then(win => {
      cy.spy(win.console, 'error').as('consoleError');
      cy.spy(win.console, 'warn').as('consoleWarn');
    });
    cy.reload();
    cy.get('@consoleError').should('not.have.been.called');
    // warnings are allowed in some cases; keep eye but do not fail strictly
  });
});
