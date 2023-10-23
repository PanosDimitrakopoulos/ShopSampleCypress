import Helpers from "@support/helpers";

const { testData } = Helpers;
const userEmail = Cypress.env('USER_EMAIL_2');
const userPassword = Cypress.env('USER_PASSWORD');

describe('Login & Register Journeys', () => {

    before(() => {
        cy.viewport(1920, 1080);
        cy.visit(Cypress.env('APP_URL')).wait(1000);
        cy.acceptAllCookies();
    });

    it('User Register - Validate Register Modal', () => {
        cy.assertRegisterTab();
    });

    it('User Register - New Credentials', () => {
        cy.registerRandom(userEmail, userPassword);
        cy.wait(1000);
        cy.userLogout();
    });

    it('User Register - Wrong Password Formatt', () => {
        const userPassword = "Test";

        cy.register(userEmail, userPassword);

        cy.get(testData("wrong-password-format-alert"))
          .contains('Text')
          .should('exist')
          .and('not.be.empty');

        cy.get(testData("close-modal")).click();
    });

    it('User Register - Existing Credentials', () => {

        cy.register(userEmail, userPassword);

        cy.get(testData("wrong-password-format-alert"))
          .contains('Error Message')
          .should('exist')
          .and('not.be.empty');

        cy.get(testData("close-modal")).click();
    });

    it('User Register - Register & Delete Account', () => {

        cy.registerRandom(userEmail, userPassword);
        cy.wait(1000);
        cy.userDelete();
    });
});
