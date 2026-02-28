//*********************************************** */
//  3. Validacion de campos obligatorios
//
//  Test incluye:  
//    - Valida campo Username obligatorio
//    - Valida campo Password obligatorio
//    - Valida campo Username y Password obligatorio
//
//    Diseñador por: Andres Felipe Zuñiga
//*********************************************** */

describe('3. Validacion de campos obligatorios', () => {

    const user = "standard_user";
    const password = "secret_sauce";

      beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        cy.contains('Swag Labs').should('be.visible');
      });

    //Validar campo Username es obligatorio
      it('3.1 Validacion de campo Username', () => {
        cy.get('[data-test="username"]').clear();
        cy.get('[data-test="password"]').clear().type(password);
        cy.get('[data-test="login-button"]').click();

        //Validar que se muestre error
          cy.get('[data-test="error"]').should('be.visible')
          .and('contain.text', 'Epic sadface: Username is required')
          .invoke('text')
          .then((errorText) => {
            console.log("3.1 Validacion de campo Username -> " + errorText);
        });
      });

    //Validar campo Password es obligatorio
      it('3.2 Validacion de campo Password', () => {
        cy.get('[data-test="username"]').clear().type(user);
        cy.get('[data-test="password"]').clear();
        cy.get('[data-test="login-button"]').click();

        //Validar que se muestre error
          cy.get('[data-test="error"]').should('be.visible')
          .and('contain.text', 'Epic sadface: Password is required')
          .invoke('text')
          .then((errorText) => {
            console.log("3.2 Validacion de campo Password -> " + errorText);
        });
      });

    //Validar campo Username y Password es obligatorio
      it('3.3 Validacion de campo Username y Password', () => {
        cy.get('[data-test="username"]').clear();
        cy.get('[data-test="password"]').clear();
        cy.get('[data-test="login-button"]').click();

        //Validar que se muestre error
          cy.get('[data-test="error"]').should('be.visible')
          .and('contain.text', 'Epic sadface: Username is required')
          .invoke('text')
          .then((errorText) => {
            console.log("3.3 Validacion de campo Username y Password -> " + errorText);
        });
      });
});
  
