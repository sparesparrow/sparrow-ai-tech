// Advanced Cypress E2E tests for Sparrow AI Tech

describe('Advanced User Flows', () => {
  beforeEach(() => {
    cy.visit('/sparrow-ai-tech/');
  });

  it('navigates through the main sections and persists state', () => {
    // Go to Portfolio
    cy.get('a').contains(/portfolio/i).click();
    cy.url().should('include', '#portfolio');
    cy.contains(/projects/i);

    // Go to Articles and open an article
    cy.get('a').contains(/articles/i).click();
    cy.url().should('include', '#articles');
    cy.get('a').contains(/hexagonal architecture/i).should('have.attr', 'href');

    // Go to Infographics and open one
    cy.get('a').contains(/infographics/i).click();
    cy.url().should('include', '#infographics');
    cy.get('a').contains(/MCP Ecosystem/i).click({force:true});
    cy.url().should('include', '/infographics/1');
    cy.contains(/MCP Ecosystem/i);
  });

  it.skip('handles API/network errors gracefully', () => {
    cy.intercept('GET', '/sparrow-ai-tech/api/some-endpoint', { statusCode: 500 }).as('getApi');
    cy.visit('/sparrow-ai-tech/');
    cy.wait('@getApi');
    cy.contains(/error/i).should('be.visible');
  });

  it('checks accessibility on the homepage', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it('works correctly on mobile viewport', () => {
    cy.viewport('iphone-6');
    cy.visit('/sparrow-ai-tech/');
    cy.get('button').contains(/menu/i).click({force:true});
    cy.get('nav').should('be.visible');
  });

  it.skip('tests form validation and submission', () => {
    cy.visit('/sparrow-ai-tech/contact');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('form').submit();
    cy.contains(/invalid email/i).should('be.visible');
    cy.get('input[name="email"]').clear().type('user@example.com');
    cy.get('textarea[name="message"]').type('Hello!');
    cy.get('form').submit();
    cy.contains(/thank you/i).should('be.visible');
  });
});

describe('Mermaid Editor E2E', () => {
  beforeEach(() => {
    cy.visit('/mermaid-editor');
  });

  it('renders the editor and preview', () => {
    cy.get('[data-cy="mermaid-editor-textarea"]').should('exist');
    cy.get('[data-cy="mermaid-editor-update-btn"]').should('exist');
    cy.get('[data-cy="mermaid-editor-clear-btn"]').should('exist');
    cy.get('[data-cy="mermaid-editor-copy-btn"]').should('exist');
    cy.get('[data-cy="mermaid-editor-preview"]').should('exist');
  });

  it('updates the diagram on Update Diagram click', () => {
    const newCode = 'graph TD\nA --> B';
    cy.get('[data-cy="mermaid-editor-textarea"]').clear().type(newCode);
    cy.get('[data-cy="mermaid-editor-update-btn"]').click();
    cy.get('[data-cy="mermaid-editor-preview"]').find('svg').should('exist');
    cy.get('[data-cy="mermaid-editor-preview"]').contains('A').should('exist');
    cy.get('[data-cy="mermaid-editor-preview"]').contains('B').should('exist');
  });

  it('shows error for invalid Mermaid code', () => {
    cy.get('[data-cy="mermaid-editor-textarea"]').clear().type('not a diagram');
    cy.get('[data-cy="mermaid-editor-update-btn"]').click();
    cy.get('[data-cy="mermaid-editor-error"]').should('exist').and('contain', 'Diagram syntax error');
  });

  it('clears the editor and preview', () => {
    cy.get('[data-cy="mermaid-editor-clear-btn"]').click();
    cy.on('window:confirm', () => true);
    cy.get('[data-cy="mermaid-editor-textarea"]').should('have.value', '');
    cy.get('[data-cy="mermaid-editor-preview"]').should('contain', 'Enter Mermaid code to see preview');
  });

  it('copies code to clipboard', () => {
    const testCode = 'graph TD\nX --> Y';
    cy.get('[data-cy="mermaid-editor-textarea"]').clear().type(testCode);
    cy.window().then(win => {
      cy.stub(win.navigator.clipboard, 'writeText').as('writeText');
    });
    cy.get('[data-cy="mermaid-editor-copy-btn"]').click();
    cy.get('@writeText').should('have.been.calledWith', testCode);
    cy.get('[data-cy="mermaid-editor-copy-btn"]').should('contain', 'Copied!');
  });

  it('updates diagram with Ctrl+Enter', () => {
    const newCode = 'graph TD\nC --> D';
    cy.get('[data-cy="mermaid-editor-textarea"]').clear().type(newCode);
    cy.get('[data-cy="mermaid-editor-textarea"]').type('{ctrl}{enter}');
    cy.get('[data-cy="mermaid-editor-preview"]').find('svg').should('exist');
    cy.get('[data-cy="mermaid-editor-preview"]').contains('C').should('exist');
    cy.get('[data-cy="mermaid-editor-preview"]').contains('D').should('exist');
  });
}); 