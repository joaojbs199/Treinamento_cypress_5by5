/// <reference types="cypress" />

describe('Article', () => {

  let time;

  beforeEach(() => {
    cy.login()
    cy.visit("/")
    cy.contains("New Article").should("be.visible").click()
    time = new Date().getTime()
  });

  it('Should create new article', () => {
    const articleName = `New article${time}`;
    cy.get('[ng-model$="title"]').type(articleName)
    cy.get('[ng-model$="description"]').type("New description")
    cy.get('[ng-model$="body"]').type("New body")
    cy.get('[ng-model$="tagField"]').type("New tag").type('{enter}')
    cy.contains("button", "Publish Article").click()
    cy.contains("h1", articleName).should("be.visible")
  });
  it('Should test blank article', () => {
    cy.contains("button", "Publish Article").click()
    cy.contains(" title can't be blank ").should("be.visible")
  });

  it('Should test blank description', () => {
    cy.get('[ng-model$="title"]').type("New article")
    cy.contains("button", " Publish Article ").click()
    cy.contains(" description can't be blank ").should("be.visible")
  })

  it('Should test blank body', () => {
    cy.get('[ng-model$="title"]').type("New article")
    cy.get('[ng-model$="description"]').type("New description")
    cy.contains("button", " Publish Article ").click()
    cy.contains(" body can't be blank ").should("be.visible")
  })

  it('Should test new article on server error', () => {
    cy.intercept({
      method: "POST",
      pathname: "/api/articles",
      hostname: "api.realworld.io"
    }, {
      statusCode: 500,
    }).as("ErrorNewArticle")

    const articleName = `New article${time}`;
    cy.get('[ng-model$="title"]').type(articleName)
    cy.get('[ng-model$="description"]').type("New description")
    cy.get('[ng-model$="body"]').type("New body")
    cy.get('[ng-model$="tagField"]').type("New tag").type('{enter}')
    cy.contains("button", " Publish Article ").click()
    
    cy.wait("@ErrorNewArticle").then(interception => {
      expect(interception.response.statusCode).equal(500)
    });
  })

  it.only('Should test logout', () => {
    cy.visit('settings');
    cy.get('.btn-outline-danger').click();
    cy.contains("a", "Sign in").should("be.visible")
  });
});
