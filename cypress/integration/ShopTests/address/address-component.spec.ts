import Helpers from "@support/helpers";

Cypress.config('scrollBehavior', 'center');

const address_name = "Address Name";
const { addToAppURL } = Helpers;
const user_email = Cypress.env('USER_EMAIL');
const user_password = Cypress.env('USER_PASSWORD');

describe('Address Component', () => {
  beforeEach(() => {
    cy.visit(addToAppURL(''));
    cy.acceptAllCookies();
  });

  it('Address Component - New Address', () => {
    cy.typeAddress(address_name);
    cy.url().should('include', '/param');
  });

  it('Address Component - Pin Point Address', () => {
    cy.typeAddressPin(address_name);
  });

  it('Address Component - Saved Address', () => {
    cy.login(user_email, user_password);

    cy.get('[data-cy="addressSearch"]').should('be.visible').wait(1000);
    
    cy.contains("This is a Parameter").click();
    cy.url().should('include', 'user_address');
  });
});