
describe('Signup', () => {
  const clickButton = () => {
    cy.get("button[type='submit']").click()
  };

  let time;

  beforeEach(() => {
    time = new Date().getTime()
    cy.visit('/register')
  });

  it('Should test signup on success', () => {
    cy.get("[ng-model$='username']").type(`John Doe Stevens${time}`)
    cy.get("[ng-model$='email']").type(`john_DS${time}@mail.com`)
    cy.get("[ng-model$='password']").type('123456')
    clickButton()
    cy.contains('Your Feed').should("be.visible")
    cy.contains('Global Feed').should("be.visible")
  });

  it('Should test signup on blank username', () => {
    cy.get("[ng-model$='email']").type(`john_DS${time}@mail.com`)
    cy.get("[ng-model$='password']").type('123456')
    clickButton()
    cy.contains(" username can't be blank ").should("be.visible")
  });

  it('Should test signup on existent username', () => {
    cy.get("[ng-model$='username']").type(`John Doe`)
    cy.get("[ng-model$='email']").type(`john_DS${time}@mail.com`)
    cy.get("[ng-model$='password']").type('123456')
    clickButton()
    cy.contains(" username has already been taken ").should("be.visible")
  });

  it('Should test signup on blank password', () => {
    cy.get("[ng-model$='username']").type(`John Doe Stevens${time}`)
    cy.get("[ng-model$='email']").type(`john_DS${time}@mail.com`)
    clickButton()
    cy.contains(" password can't be blank ").should("be.visible")
  });

  it.only('Should test paths in success signup', () => {

    cy.intercept({
      method: "POST",
      pathname: "/api/users",
      hostname: "api.realworld.io"
    }).as("postCreateUser")



    cy.get("[ng-model$='username']").type(`John Doe Stevens${time}`)
    cy.get("[ng-model$='email']").type(`john_DS${time}@mail.com`)
    cy.get("[ng-model$='password']").type('123456')
    clickButton()

    cy.wait("@postCreateUser").then(interception => {
      expect(interception.response.statusCode).equal(200)
    })

    cy.contains('Your Feed').should("be.visible")
    cy.contains('Global Feed').should("be.visible")
  });

  it('Should test paths in success signup (simulator)', () => {

    cy.intercept({
      method: "POST",
      pathname: "/api/users",
      hostname: "api.realworld.io"
    }).as("simulatorCreateUser")
                                                                                                                                                                                                             


    cy.get("[ng-model$='username']").type(`John Doe Stevens${time}`)
    cy.get("[ng-model$='email']").type(`john_DS${time}@mail.com`)
    cy.get("[ng-model$='password']").type('123456')
    clickButton()
    cy.contains('Your Feed').should("be.visible")
    cy.contains('Global Feed').should("be.visible")
  });
});
