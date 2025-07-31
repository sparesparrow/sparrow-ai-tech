describe('PDF Download', () => {
  it('downloads a PDF file', () => {
    cy.visitApp('/');
    cy.get('[data-cy="download-pdf"]').click();
    // Check that a PDF file is downloaded (filename may vary)
    cy.readFile('cypress/downloads/document.pdf', 'binary', { timeout: 10000 }).should((pdf) => {
      expect(pdf.length).to.be.greaterThan(1000); // PDF should not be empty
    });
  });
});
