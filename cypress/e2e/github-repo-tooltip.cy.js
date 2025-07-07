describe('GitHub Repo Metadata Tooltip', () => {
  it('shows metadata tooltip on hover over GitHub repo link', () => {
    cy.visit('/markdown-test?src=/articles/github-link-test.md');
    // Wait for markdown to load
    cy.contains('Visit Sparrow AI Tech Repo').should('be.visible');
    // Hover over the link
    cy.contains('Visit Sparrow AI Tech Repo').trigger('mouseover');
    // Tooltip should appear with repo metadata (wait for fetch)
    cy.get('.tippy-box').should('be.visible');
    cy.get('.tippy-box').should('contain.text', 'sparesparrow/sparrow-ai-tech');
    cy.get('.tippy-box').should('contain.text', '⭐');
    cy.get('.tippy-box').should('contain.text', '🍴');
  });
});
