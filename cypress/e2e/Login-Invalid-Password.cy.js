//*********************************************** */
//  2. Login Fallido con contraseña incorrecta
//
//  Test incluye:  
//    - Test Login fallido con contraseña incorrecta
//
//    Diseñador por: Andres Felipe Zuñiga
//*********************************************** */

describe('2. Login Fallido con contraseña incorrecta', () => {

    let users = [];
    const password = "secret_sauce_Spoiled";

      before(() => {

        cy.visit('https://www.saucedemo.com/');

        cy.contains('Swag Labs').should('be.visible');

        // Obtener usuarios
        cy.get('[data-test="login-credentials"]')
          .invoke('html')
          .then((html) => {
            users = html
              .replace(/<br\s*\/?>/gi, '\n')   // convierte <br> en salto de línea
              .replace(/<[^>]*>/g, '')         // elimina cualquier otra etiqueta HTML  
              .replace('Accepted usernames are:', '')
              .split('\n')
              .map(u => u.trim())
              .filter(Boolean);

            cy.log("Usuarios a testear: " + users.join(','));
            console.log("Usuarios a testear: " + users.join(','));
          });
      });
    

      //Iterar sobre todos los usuarios
      it('2. Login Fallido con credenciales inválidas para todos los usuarios', () => {

        cy.wrap(users).each((user) => {
          
          cy.visit('https://www.saucedemo.com/');          
          //console.log("Entra con usuario " + user);

          cy.get('[data-test="username"]').clear().type(user);
          cy.get('[data-test="password"]').clear().type(password);
          cy.get('[data-test="login-button"]').click();

          //Validar que se muestre error
          cy.get('[data-test="error"]').should('be.visible')
          .and('contain.text', 'Epic sadface: Username and password do not match any user in this service')
          .invoke('text')
          .then((errorText) => {
            console.log("Usuario: " + user + " -> " + errorText);
          });
           
        });
      });
});