import Helpers from "@support/helpers";

//Data & Locators
const { testData } = Helpers;
const email = 'test@test.com.gr';
const invalid_msg = 'invalid'
const pass_reset_msg = 'message'
const login_btn_txt = 'text'
const new_pass = 'NewText'
const new_pass_txt = 'NewPassTxt'
const passwordField = '#reset_pass';
const userPassword = Cypress.env('USER_PASSWORD');

//URL
const resetPasswordURL = 'https://staging.sample.com.gr/';

//Config
Cypress.config('scrollBehavior', 'center');

describe('Login & register flows', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('APP_URL'));
    cy.acceptAllCookies();
  });


  it('Password Reset - Asks for Password reset & asserts alerts', () => {
    cy.passwordReset(email);

    cy.contains(pass_reset_msg).should('exist');
    cy.contains(login_btn_txt).should('have.attr', 'href', 'passReset');
  });

  it('Password Reset - Validate invalid e-mail application of reset password modal (& alerts)', () => {
    cy.passwordReset(email);
    cy.contains(invalid_msg).should('have.length', 0);
  });

  it('Password Reset - Validate fields copies of reset password page & Reset password with a valid password format', () => {
    cy.visit(resetPasswordURL);

    cy.contains(new_pass).should('exist');
    cy.contains(new_pass_txt).should('exist');

    cy.get('.hero').should('have.attr', 'style', 'background-image: url(imageUrl)');

    cy.get(passwordField)
      .should('have.id', 'reset_pass')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'inputmode', 'text')
      .and('be.enabled')
      .click()
      .type(userPassword);

    cy.contains('Change').click();
    cy.contains('Error Message').should('exist');
  });

  it('Password Reset - Validate Password Format', () => {
    cy.visit(resetPasswordURL);

    cy.get(passwordField)
      .should('have.id', 'reset_pass')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'inputmode', 'text')
      .and('be.enabled')
      .click()
      .type(`1234`);

    cy.contains('Change').click();
    cy.contains('Error Message').should('exist');
  });

  it('Password Reset - Reset password with an empty password field', () => {
    cy.visit(resetPasswordURL);

    cy.get(passwordField)
      .should('have.id', 'reset_pass')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'inputmode', 'text')
      .and('be.enabled')
      .click();

    cy.contains('Change').click();
    cy.contains('Message').should('exist');
  });
});