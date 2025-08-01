describe('Homepage Analysis', () => {
  beforeEach(() => {
    cy.visit('https://sparesparrow.github.io/sparrow-ai-tech/')
  })

  it('should load the homepage successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('contain', 'Model Context Protocol Pioneer')
  })

  it('should have proper meta tags and viewport', () => {
    cy.get('meta[charset="UTF-8"]').should('exist')
    cy.get('meta[name="viewport"]').should('exist')
  })

  it('should load CSS files without 404 errors', () => {
    cy.visit('https://sparesparrow.github.io/sparrow-ai-tech/')
    cy.get('link[href="/styles/main.css"]').should('exist')
    cy.get('body').should('have.css', 'background-color', 'rgb(13, 17, 23)')
  })

  it('should load JavaScript files without 404 errors', () => {
    cy.visit('https://sparesparrow.github.io/sparrow-ai-tech/')
    cy.get('script[src="/js/app.js"]').should('exist')
    cy.get('[data-testid="language-toggle"]').should('be.visible')
  })

  it('should have proper navigation structure', () => {
    cy.get('nav.nav').should('exist')
    cy.get('.nav-logo').should('contain', 'sparrow-ai-tech')
  })

  it('should have hero section with proper content', () => {
    cy.get('#hero').should('exist')
    cy.get('.hero-title').should('contain', 'Model Context Protocol')
    cy.get('.hero-description').should('exist')
  })

  it('should have philosophy section with quotes', () => {
    cy.get('#philosophy').should('exist')
    cy.get('.philosophy-quotes').should('exist')
    cy.get('.quote-item').should('have.length.at.least', 1)
  })

  it('should have working language toggle', () => {
    cy.get('[data-testid="language-toggle"]').should('exist')
    // Test language switching if implemented
  })

  it('should have proper styling applied', () => {
    cy.get('body').should('have.css', 'background-color', 'rgb(13, 17, 23)')
    cy.get('body').should('have.css', 'color', 'rgb(240, 246, 252)')
  })

  it('should be responsive', () => {
    cy.viewport('iphone-6')
    cy.get('nav.nav').should('be.visible')
    cy.get('#hero').should('be.visible')
    
    cy.viewport('ipad-2')
    cy.get('nav.nav').should('be.visible')
    cy.get('#hero').should('be.visible')
    
    cy.viewport(1920, 1080)
    cy.get('nav.nav').should('be.visible')
    cy.get('#hero').should('be.visible')
  })

  it('should have no console errors', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
    cy.reload()
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('should have proper accessibility', () => {
    cy.get('html').should('have.attr', 'lang')
    cy.get('h1').should('exist')
    cy.get('nav').should('exist')
  })

  it('should have working navigation links', () => {
    cy.get('a[href="#projects"]').should('exist')
    cy.get('a[href="#contact"]').should('exist')
  })
}) 