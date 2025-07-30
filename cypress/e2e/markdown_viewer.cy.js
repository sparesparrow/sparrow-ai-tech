/**
 * E2E testy pro komponentu MarkdownViewer.
 *
 * Testované scénáře:
 * 1. Načítání a renderování markdownu z libovolné cesty (např. /articles/mcp-prompts.md)
 * 2. Renderování Mermaid diagramů (kontrola .mermaid-diagram a SVG výstupu)
 * 3. Konzistentní stylování (kontrola tříd prose a prose-invert)
 * 4. Stav načítání a chyb (simulace neúspěšného fetch a kontrola loading/error hlášek)
 * 5. Podpora vlastního className (kontrola, zda je vlastní třída aplikována)
 *
 * Další kroky:
 * - Ujistěte se, že existuje testovací stránka na /markdown-test, která vykresluje MarkdownViewer s parametry src a className z query stringu.
 * - Upravte selektory a cesty k souborům dle vaší skutečné implementace a routování.
 * - Spusťte Cypress testy pro ověření chování komponenty.
 */

describe('MarkdownViewer Component', () => {
  // Cesta k testovacímu markdown souboru
  const testMd = '/articles/mcp-prompts.md';
  // Cesta k markdown souboru obsahujícímu Mermaid diagram
  const testMermaidMd = '/articles/mcp-prompts-rs.md'; // Předpokládá se, že tento soubor obsahuje Mermaid diagram
  // Cesta k neexistujícímu markdown souboru pro testování chybového stavu
  const notFoundMd = '/articles/does-not-exist.md';

  /**
   * Test: Načítání a renderování markdownu z libovolné cesty
   */
  it('fetches and renders markdown from any path', () => {
    cy.visit(`/sparrow-ai-tech/markdown-test?src=${testMd}`);
    cy.get('.markdown-viewer').should('exist');
    cy.contains('MCP Prompts').should('exist'); // Upravte na existující nadpis v testovacím souboru
  });

  /**
   * Test: Renderování Mermaid diagramů
   */
  it('renders Mermaid diagrams', () => {
    cy.visit(`/sparrow-ai-tech/markdown-test?src=${testMermaidMd}`);
    cy.get('.mermaid-diagram').should('exist');
    cy.get('.mermaid-diagram svg').should('exist');
  });

  /**
   * Test: Konzistentní stylování pomocí tříd prose
   */
  it('applies consistent styling with prose classes', () => {
    cy.visit(`/sparrow-ai-tech/markdown-test?src=${testMd}`);
    cy.get('.markdown-viewer').should('have.class', 'prose').and('have.class', 'prose-invert');
  });

  /**
   * Test: Zobrazení stavů načítání a chyb
   */
  it('shows loading and error states', () => {
    cy.intercept('GET', notFoundMd, { statusCode: 404 }).as('fetch404');
    cy.visit(`/sparrow-ai-tech/markdown-test?src=${notFoundMd}`);
    cy.get('.markdown-viewer-loading').should('exist');
    cy.wait('@fetch404');
    cy.get('.markdown-viewer-error').should('exist').and('contain', 'Failed to fetch');
  });

  /**
   * Test: Podpora vlastního className
   */
  it('applies custom className', () => {
    // Předpoklad: /markdown-test?src=...&className=custom-md-class přidá vlastní třídu
    cy.visit(`/sparrow-ai-tech/markdown-test?src=${testMd}&className=custom-md-class`);
    cy.get('.markdown-viewer').should('have.class', 'custom-md-class');
  });

  it('renders markdown content', () => {
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/mcp-prompts.md');
    cy.get('.prose').should('exist');
    cy.contains('Some expected heading or text from the markdown');
  });

  it('renders mermaid diagram', () => {
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/mermaid-example.md');
    cy.get('.mermaid-diagram').find('svg').should('exist');
  });

  it('shows error on fetch fail', () => {
    cy.intercept('GET', '/articles/does-not-exist.md', { statusCode: 404 });
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/does-not-exist.md');
    cy.contains('Error').should('exist');
  });

  it('shows image preview on hover for image links', () => {
    // This markdown file should contain: [Alt text](/assets/images/test-image.png)
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/image-link-test.md');
    cy.contains('Alt text').trigger('mouseover');
    cy.get('.tippy-box img').should('be.visible').and(($img) => {
      expect($img[0].src).to.match(/test-image\.png$/);
    });
  });

  it('shows Mermaid diagram preview on hover for .mmd links', () => {
    // /articles/mermaid-test-link.md should contain: [Diagram](/articles/test-diagram.mmd)
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/mermaid-test-link.md');
    cy.contains('Diagram').trigger('mouseover');
    cy.get('.tippy-box .mermaid-diagram svg').should('be.visible');
  });

  it('shows GitHub repo metadata tooltip on hover for repo links', () => {
    // /articles/github-link-test.md should contain: [MCP Prompts](https://github.com/sparesparrow/mcp-prompts)
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/github-link-test.md');
    cy.contains('MCP Prompts').trigger('mouseover');
    cy.get('.tippy-box').should('contain.text', 'sparesparrow/mcp-prompts');
    cy.get('.tippy-box').should('contain.text', 'stars').or('contain.text', '⭐');
    cy.get('.tippy-box').should('contain.text', 'forks').or('contain.text', '🍴');
  });

  // Example: Use data-cy selectors for markdown/mermaid viewer if present
  cy.get('[data-cy="articles-section"]').should('exist');
});