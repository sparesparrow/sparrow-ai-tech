describe('MarkdownViewer Component', () => {
  it('renders markdown content and custom link renderers', () => {
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/github-link-test.md');
    cy.contains('GitHub Repo Link Test').should('be.visible');
    cy.contains('Visit Sparrow AI Tech Repo').should('be.visible');
  });

  it('shows GitHub repo metadata tooltip on hover', () => {
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/github-link-test.md');
    cy.contains('Visit Sparrow AI Tech Repo').trigger('mouseover');
    cy.get('.tippy-box').should('be.visible');
    cy.get('.tippy-box').should('contain.text', 'sparesparrow/sparrow-ai-tech');
    cy.get('.tippy-box').should('contain.text', '⭐');
    cy.get('.tippy-box').should('contain.text', '🍴');
  });
});

describe('ImagePreviewLink Component', () => {
  before(() => {
    cy.writeFile('public/test-image.png', Buffer.from([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,6,0,0,0,31,21,196,137,0,0,0,12,73,68,65,84,8,153,99,0,1,0,0,5,0,1,13,10,26,10,0,0,0,0,73,69,78,68,174,66,96,130]), 'binary');
    cy.writeFile('articles/image-link-test.md', '# Image Link Test\n\n[Preview Image](/test-image.png)');
  });

  it('shows image preview tooltip on hover', () => {
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/image-link-test.md');
    cy.contains('Preview Image').trigger('mouseover');
    cy.get('.tippy-box img').should('be.visible');
    cy.get('.tippy-box img').should('have.attr', 'src', '/test-image.png');
  });
});

describe('MermaidPreviewLink Component', () => {
  before(() => {
    cy.writeFile('articles/diagram.mmd', 'graph TD; A-->B;');
    cy.writeFile('articles/mermaid-link-test.md', '# Mermaid Link Test\n\n[Preview Diagram](/articles/diagram.mmd)');
  });

  it('shows mermaid diagram preview tooltip on hover', () => {
    cy.visit('/sparrow-ai-tech/markdown-test?src=./articles/mermaid-link-test.md');
    cy.contains('Preview Diagram').trigger('mouseover');
    cy.get('.tippy-box .mermaid-diagram').should('be.visible');
    cy.get('.tippy-box').should('contain.text', 'A');
    cy.get('.tippy-box').should('contain.text', 'B');
  });
});
