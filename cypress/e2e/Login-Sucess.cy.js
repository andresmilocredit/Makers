//*********************************************** */
//  1. Login Exitoso con credenciales validas
//
//  Test incluye:  
//    - Test Login exitoso para todos los usuarios
//    - Se manejan errores para usuarios bloqueados. 
//
//    Diseñador por: Andres Felipe Zuñiga
//*********************************************** */

describe('1. Login exitoso con credenciales válidas', () => {

    let users = [];
    let password = '';

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

          // Obtener contraseña
          cy.get('[data-test="login-password"]')
            .invoke('text')
            .then((text) => {
              password = text.replace('Password for all users:', '').trim();
              cy.log("Password: " + password);
              console.log("Password: " + password);
            });
      });
    

      //Iterar sobre todos los usuarios
      it('1. Login exitoso con credenciales válidas para todos los usuarios', () => {

        cy.wrap(users).each((user) => {
          
          cy.visit('https://www.saucedemo.com/');          
          //console.log("Entra con usuario " + user);

          cy.get('[data-test="username"]').clear().type(user);
          cy.get('[data-test="password"]').clear().type(password);
          cy.get('[data-test="login-button"]').click();

          // Manejo dde Login Exitoso / Bloqueado
          cy.get('body').then($body => {
            if ($body.find('[data-test="error"]').length){
              //Login fallido (Usuario bloqueado)
              cy.get('[data-test="error"]').then($err => {
                cy.log(`Usuario ${user} bloqueado: ${$err.text()}`);
                console.log(`Usuario ${user} bloqueado: ${$err.text()}`);
              });
            }
            else {
              //Login Exitoso
              cy.contains('Products').should('be.visible');

              //LogOut
              cy.get('#react-burger-menu-btn').click();            
              cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click();
              cy.log(`Login-Logout exitoso para ${user}`);
              console.log(`Login-Logout exitoso para ${user}`);
            }
          });      
        });
      });
});