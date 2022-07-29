describe('Signin', () => {

  const clickButton = () => {
    cy.get("button[type='submit']").click()
  };

  let time;

  beforeEach(() => {
    time = new Date().getTime()
    cy.visit('/login')
  });

  const user = {
    name: Cypress.env("username"),
    email: Cypress.env("email"),
    password: Cypress.env("password"),
  }
  it('Should test signin on blank email', () => {
    cy.get("[ng-model$='password']").type(user.password)
    clickButton()
    cy.contains(" email can't be blank ").should("be.visible")
  });

  it('Should test signin on blank username', () => {
    cy.get("[ng-model$='email']").type(user.email)
    clickButton()
    cy.contains(" password can't be blank ").should("be.visible")
  });

  it('Should test signin on wrong password', () => {
    cy.get("[ng-model$='email']").type(user.email)
    cy.get("[ng-model$='password']").type(`${user.password}${time}`)
    clickButton()
    cy.contains(" email or password is invalid ").should("be.visible")
  });

  it('Should test signin on invalid user', () => {
    cy.get("[ng-model$='email']").type(`${user.email}${time}`)
    cy.get("[ng-model$='password']").type(user.password)
    clickButton()
    cy.contains(" email or password is invalid ").should("be.visible")
  });

  it('Should access "need an account"', () => {
    cy.contains("a", "Need an account").click()
    cy.contains("a", "Have an account").should("be.visible")
    cy.contains("Sign up").should("be.visible")
  });

  it('Should test signin on indisponible server', () => {
    cy.intercept({
      method: "POST",
      pathname: "/api/users/login",
      hostname: "api.realworld.io"
    }, {
      statusCode: 500,
    }).as("ErrorLogin")

    cy.get("[ng-model$='email']").type(user.email)
    cy.get("[ng-model$='password']").type(user.password)
    clickButton()
    
    cy.wait("@ErrorLogin").then(interception => {
      expect(interception.response.statusCode).equal(500)
    })
  })

  it('Should test signin on success', () => {
    cy.intercept({
      method: "POST",
      pathname: "/api/users/login",
      hostname: "api.realworld.io"
    }).as("SuccessLogin")

    cy.get("[ng-model$='email']").type(user.email)
    cy.get("[ng-model$='password']").type(user.password)
    clickButton()

    cy.wait("@SuccessLogin").then(interception => {
      expect(interception.response.statusCode).equal(200)
    });
  });
});
