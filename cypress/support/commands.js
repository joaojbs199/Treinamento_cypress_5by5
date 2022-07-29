// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.request({
    method: "POST",
    url: 'https://api.realworld.io/api/users/login',
    body: {
      "user": {
        "email": "teste-abc@abc.com",
        "password": "teste-abc"
      }
    },
    failOnStatusCode: false
  }).then(response => {
    window.localStorage.setItem("jwtToken", response.body.user.token)
  })
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

