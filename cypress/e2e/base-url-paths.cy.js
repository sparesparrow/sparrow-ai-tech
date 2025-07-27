const base = Cypress.env("BASE_URL") || "";
// cypress/e2e/base-url-paths.cy.js
describe('Base URL Path Validation', () => {
  const base = Cypress.config('baseUrl').replace(/https?:\/\//, '/').replace(/\/$/, '');

  beforeEach(() => {
    // Visit the homepage
    cy.visitApp('/');
  });

  describe('Asset URLs', () => {
    it('should have correct image src paths with base URL', () => {
      // Check that all images have the correct base path
      cy.get('img[src]').each(($img) => {
        const src = $img.attr('src');

        // Skip external URLs (http/https) and data URLs
        if (!src.startsWith('http') && !src.startsWith('data:')) {
          expect(src).to.match(new RegExp(`^${base}`),
            `Image src "${src}" should start with base URL "${base}"`);
        }
      });
    });

    it('should have correct CSS link paths', () => {
      cy.get('link[href][rel="stylesheet"]').each(($link) => {
        const href = $link.attr('href');

        // Skip external URLs
        if (!href.startsWith('http')) {
          expect(href).to.match(new RegExp(`^${base}`),
            `CSS link href "${href}" should start with base URL "${base}"`);
        }
      });
    });

    it('should have correct JavaScript src paths', () => {
      cy.get('script[src]').each(($script) => {
        const src = $script.attr('src');

        // Skip external URLs and inline scripts
        if (src && !src.startsWith('http')) {
          expect(src).to.match(new RegExp(`^${base}`),
            `Script src "${src}" should start with base URL "${base}"`);
        }
      });
    });
  });

  describe('Navigation Links', () => {
    it('should have correct internal navigation links', () => {
      // Check internal navigation links
      cy.get('a[href]').each(($link) => {
        const href = $link.attr('href');

        // Skip external URLs, mailto, tel, and hash links
        if (href &&
          !href.startsWith('http') &&
          !href.startsWith('mailto:') &&
          !href.startsWith('tel:') &&
          !href.startsWith('#')) {

          expect(href).to.match(new RegExp(`^${base}`),
            `Internal link href "${href}" should start with base URL "${base}"`);
        }
      });
    });

    it('should navigate to article pages correctly', () => {
      // Test specific article links if they exist
      cy.get('a[href*="/articles/"]').first().then(($link) => {
        const href = $link.attr('href');
        expect(href).to.match(new RegExp(`^${base}/articles/`));

        // Try to visit the link
        cy.wrap($link).click();
        cy.url().should('include', `${base}/articles/`);
      });
    });

    it('should navigate to infographic pages correctly', () => {
      // Test infographic links if they exist
      cy.get('a[href*="/infographics/"]').first().then(($link) => {
        const href = $link.attr('href');
        expect(href).to.match(new RegExp(`^${base}/infographics/`));

        // Try to visit the link
        cy.wrap($link).click();
        cy.url().should('include', `${base}/infographics/`);
      });
    });
  });

  describe('API Endpoints', () => {
    it('should have correct API endpoint references', () => {
      // Check for any API calls in the page
      cy.window().then((win) => {
        // Mock fetch to intercept API calls
        cy.stub(win, 'fetch').as('fetchStub');
      });

      // Trigger any API calls and verify they use correct base path
      cy.get('body').then(() => {
        cy.get('@fetchStub').should('have.been.calledWithMatch', /\/sparrow-ai-tech\/api\//);
      });
    });
  });

  describe('Static Assets', () => {
    it('should load favicon correctly', () => {
      cy.get('link[rel="icon"], link[rel="shortcut icon"]').each(($link) => {
        const href = $link.attr('href');
        if (href && !href.startsWith('http')) {
          expect(href).to.match(new RegExp(`^${base}`));
        }
      });
    });

    it('should load manifest files correctly', () => {
      cy.get('link[rel="manifest"]').each(($link) => {
        const href = $link.attr('href');
        if (href && !href.startsWith('http')) {
          expect(href).to.match(new RegExp(`^${base}`));
        }
      });
    });
  });

  describe('Asset Loading Verification', () => {
    it('should successfully load key images', () => {
      // Test that images actually load (not just have correct paths)
      cy.get('img[src*="/sparrow-ai-tech/assets/images/"]').each(($img) => {
        const src = $img.attr('src');

        // Make HTTP request to verify image loads
        cy.request({
          url: src,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 304],
            `Image ${src} should load successfully`);
        });
      });
    });

    it('should successfully load CSS files', () => {
      cy.get('link[href*="/sparrow-ai-tech/"][rel="stylesheet"]').each(($link) => {
        const href = $link.attr('href');

        cy.request({
          url: href,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 304],
            `CSS file ${href} should load successfully`);
        });
      });
    });
  });

  describe('Route Testing', () => {
    it('should handle direct navigation to article pages', () => {
      // Test direct navigation to article pages
      cy.visit('/articles/hexagonal-architecture-in-mcp.md');
      cy.url().should('include', `${base}/articles/`);

      // Check that assets on this page also have correct base paths
      cy.get('img[src]').each(($img) => {
        const src = $img.attr('src');
        if (!src.startsWith('http') && !src.startsWith('data:')) {
          expect(src).to.match(new RegExp(`^${base}`));
        }
      });
    });

    it('should handle direct navigation to infographic pages', () => {
      cy.visit('/infographics/Infographic1.html');
      cy.url().should('include', `${base}/infographics/`);

      // Verify assets on infographic pages
      cy.get('img[src], script[src], link[href]').each(($element) => {
        const url = $element.attr('src') || $element.attr('href');
        if (url && !url.startsWith('http') && !url.startsWith('data:')) {
          expect(url).to.match(new RegExp(`^${base}`));
        }
      });
    });
  });
});

// Additional test for development vs production
describe('Environment-specific Base URL', () => {
  it('should use correct base URL for current environment', () => {
    cy.window().then((win) => {
      const isProduction = win.location.hostname.includes('github.io');
      const currentPath = win.location.pathname;

      if (isProduction) {
        expect(currentPath).to.match(new RegExp(`^${base}`));
      }
    });
  });
});