describe('Theme and Language Controls', () => {
  it('switches language via toggle and persists through reload', () => {
    cy.visit('/');
    cy.get('[data-cy="language-toggle"]').click({ force: true });
    cy.location('search').should('include', 'lang=');
    cy.reload();
    cy.location('search').should('include', 'lang=');
  });

  it('toggles dark mode', () => {
    cy.visit('/');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('selects UI theme from select', () => {
    cy.visit('/');
    cy.get('[data-testid="theme-select"]').select('Cyberpunk');
    cy.get('html').should('have.attr', 'data-ui-theme', 'cyberpunk');
  });
});

describe('Repo Gallery Filters', () => {
  it('loads repos and filters by tech', () => {
    cy.visit('/');
    cy.get('[data-cy="repo-grid"]').should('exist');
    cy.get('[data-cy^="tech-"]').first().click();
    cy.get('[data-cy="repo-card"]').should('exist');
  });
});

describe('ElevenLabs Widget', () => {
  it('renders the convai widget script and element', () => {
    cy.visit('/');
    cy.get('elevenlabs-convai').should('exist');
  });
});
