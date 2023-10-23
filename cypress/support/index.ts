/// <reference types="cypress" />

declare namespace Cypress {
   interface Chainable {
      /**
      * Command Comment
      * @example cy.login('email@example.com', 'password')
      */
      login(email: string, password: string): Chainable<Element>

      /**
      * Command Comment
      * @example cy.passwordReset('email@example.com')
      */
      passwordReset(email: string): Chainable<Element>

      /**
      * Command Comment
      * @example cy.assertLoginModal()
      */
      assertLoginModal(): Chainable<Element>;

      /**
      * Command Comment
      * @example cy.interceptLogin()
      */
      interceptLogin(): Chainable<Element>

      /**
      * Command Comment
      * @example cy.assertRegisterTab()
      */
      assertRegisterTab(): Chainable<Element>
        
      /**
      * Command Comment
      * @example cy.login('email@example.com', 'password')
      */
      register(email: string, password: string): Chainable<Element>;

      /**
      * Command Comment.
      * @example cy.login('email@example.com', 'password')
      */
      registerRandom(email: string, password: string): Chainable<Element>

      /**
      * Command Comment.
      * @example cy.userDelete()
      */
      userDelete(): Chainable<Element>

      /**
      * Command Comment
      * @example cy.userLogout()
      */
      userLogout(): Chainable<Element>

      /**
      * Command Comment
      * @example cy.acceptAllCookies()
      */
      acceptAllCookies(): Chainable<Element>

      /**
      * Command Comment
      * @example cy.typeAddress('Address Name')
      * Command Instructions
      */
      typeAddress(address: string): Chainable<Element>

      /**
      * Command Comment
      * @example cy.typeAddressPin('Address Name')
      */
      typeAddressPin(address: string): Chainable<Element>

      /**
      * Command Comment
      * @example cy.typeAddressShopProfile('Address Name')
      */
      typeAddressShopProfile(address: string): Chainable<Element>

      /** */
   }
}