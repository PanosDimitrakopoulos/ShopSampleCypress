import Helpers from "@support/helpers";

const {addToAppURL} = Helpers;
const elements = {
  header: 'Header 1',
  title1: 'Title 1',
  button1: 'Button 1',
  title2: 'Title 2',
  button2: 'Button 2',
  button3: 'Button 3',
};

const cookies_trans = {
  translation1: 'Translation 1',
  translation2: 'Translation 2',
  collapse1: 'Collapse 1',
  question1: 'Question 1',
  translation3: 'Translation 3',
  title1: 'Title 1',
  title2: 'Title 2',
  translation4: 'Translation 4',
  title3: 'Title 3',
  translation5: 'Translation 5',
  title4: 'Title 4',
  translation6: 'Translation 6',
  title5: 'Title 5',
  button2: 'Button 2',
};

describe('Cookies banner test cases', () => {
//10seconds
    beforeEach (() => {
        cy.viewport(1902,1080);

        cy.visit(addToAppURL(''));
    });

  it('Cookies - Delete cookies & Reconfirm', () => {
    cy.acceptAllCookies();

    cy.clearCookies();

    cy.reload();

    cy.acceptAllCookies();
  });

  it('Cookies - Validate Cookies translations & Buttons', () => {
    cy.contains(cookies_trans.translation1).should('exist');
    cy.contains(cookies_trans.translation2).should('exist');
    cy.contains(cookies_trans.collapse1).should('exist').click();
    cy.contains(cookies_trans.question1).should('exist');
    cy.contains(cookies_trans.translation3).should('exist');
    cy.contains(cookies_trans.title1).should('have.attr', 'href', '/page/cookies').and('exist');
    cy.contains(cookies_trans.title2).should('exist').click().should('have.attr', 'disabled');
    cy.contains(cookies_trans.translation4).should('exist');
    cy.contains(cookies_trans.title3).should('exist').click();
    cy.contains(cookies_trans.translation5).should('exist');
    cy.contains(cookies_trans.title4).should('exist').click();
    cy.contains(cookies_trans.translation6).should('exist');
    cy.contains(cookies_trans.title5).should('exist');
    cy.contains(cookies_trans.button2).should('exist').click();
    
  });

  it('Cookies - Validate Cookie Translations & Choose (2) Cookies', () => {    
    cy.contains(elements.header).should('exist').click();
    cy.contains(elements.title1).should('exist');
    cy.contains(elements.button1).should('exist').click();
    cy.contains(elements.title2).should('exist');
    cy.contains(elements.button2).should('exist');
    cy.contains(elements.button3).should('exist').click();
    
  });
});


