describe('Primer Test QA', () => {

  it('Visita una pagina y valida titulo', () => {

    cy.visit('https://example.cypress.io');

    cy.contains('Kitchen Sink').should('be.visible');

  });

});