import Helpers from "@support/helpers";

const {testData} = Helpers;
const { APP_URL, USER_EMAIL, USER_PASSWORD } = Cypress.env();
const wrong_pass_msg = 'message'
const user_email = "test@test.com.gr"

Cypress.config('scrollBehavior', 'center');

describe('Login - Login & register flows', () => {
    beforeEach(() => {
      cy.visit(APP_URL);
      cy.acceptAllCookies();
    });
  
    it('Login - Validate Login Modal', () => {
      cy.assertLoginModal();
    });
  
    it('Login - User log in & log out', () => {
      cy.login(USER_EMAIL, USER_PASSWORD);
      cy.url().should('include', APP_URL);
    });
  
    it('Login - Wrong Credentials', () => {
      cy.login(USER_EMAIL, `${USER_PASSWORD}123`);
      cy.get(testData("wrong-password-format-alert"))
        .contains(wrong_pass_msg)
        .should('exist');
    });
  
    it('Login - Validate User Reset', () => {
      cy.passwordReset(user_email);
    });
  });