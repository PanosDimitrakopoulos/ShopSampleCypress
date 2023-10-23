import {v4 as uniqueId} from 'uuid';
import Selectors from "./selectors";
import Helpers from "./helpers";

const {addToAppURL} = Helpers;
const {testData} = Helpers;
const checkout_contactless = testData('order_attr_attr1');
const checkout_no_cutlery = testData('order_attr3');
const tobacco_optin = testData('optin');

Cypress.Commands.add('assertRegisterTab', () => {
  cy.get('.login-button').click();
  
  cy.get(testData("register-tab")).should('contain','Text').click();

  cy.contains('Text').should('exist');

  cy.get(testData('facebook-register-btn')).should('contain','Text Facebook');

  cy.get(testData('google-register-btn')).should('contain','Text Google');

  cy.get(testData('apple-register-btn')).should('contain','Text Apple');

  cy.get(testData("login-info")).contains('Text').should('exist');
  
  cy.contains('Text').should('exist');

  cy.contains('divinator').should('exist');

  cy.get(testData("register-email")).should('exist').and('have.attr', 'type', 'email');

  cy.get(testData("register-password-field")).should('exist').and('have.attr', 'type', 'password');

  cy.contains('Message').should('exist');

  cy.get(testData("submit-button")).contains('text').should('exist').and('have.a.property', 'submit');

  cy.contains('text').should('exist');

  cy.contains('text').should('exist').and('have.attr', 'href', '/page/tos');

  cy.contains('text').should('exist').and('have.attr', 'href', '/page/privacy');
});

Cypress.Commands.add('register', (username, password) => {
  cy.get('.login-button').click();

  cy.get(testData("register-tab")).click();

  cy.get(testData("register-email")).type(username);

  cy.get(testData("register-password-field")).type(password);

  cy.get(testData('register-password-show-hide-icon')).click();

  cy.get(testData("register-password-field")).should('have.value',password);

  cy.get(testData("submit-button")).should('have.text', 'Register').click();
});

Cypress.Commands.add('registerRandom', (email, password) => {
  const parts = email.split('@');

  const randomEmail = `${parts[0]}+${uniqueId()}@${parts[1]}`;

  cy.register(randomEmail, password);

  cy.wait(2000);
});

Cypress.Commands.add('userDelete', () => {
  cy.get('[id="dropdownMenuLink"]').click();

  cy.get(testData('account-btn')).click();

  cy.get(testData('about-btn')).click().wait(1000);

  cy.get(testData('delete-account-btn'))
    .should('contain', 'Text')
    .click();

  cy.contains('Text').should('exist');

  cy.contains('Text').should('exist');

  cy.contains('Text').click();

  cy.contains('Text').should('exist');

  cy.contains('Text.').should('exist');

  cy.contains('Text').should('exist').click();

  cy.wait(2000);
});

Cypress.Commands.add('assertLoginModal', () => {
  cy.get('.login-button')
    .should('be.visible')
    .click();

  cy.contains('Text').should('exist');

  cy.get(testData('facebook-login-btn')).should('contain', 'Text Facebook');

  cy.get(testData('google-login-btn')).should('contain', 'Text Google');

  cy.get(testData('apple-login-btn')).should('contain', 'Text Apple');

  cy.get(testData("login-info")).contains('Text').should('exist');

  cy.contains('Text').should('exist');

  cy.contains('Text').should('exist');

  cy.get(testData("Locator")).should('exist').and('have.attr', 'type', 'email');

  cy.get(testData("Locator")).should('exist').and('have.attr', 'type', 'password');

  cy.get(testData("Locator")).contains('Text').should('exist').and('have.attr', 'type', 'submit');

  cy.get(testData("Locator")).contains('Text').should('exist');

  cy.contains('Text').should('exist');

  cy.contains('Text').should('have.attr', 'href', '/page/tos');

  cy.contains('Text').should('have.attr', 'href', '/page/privacy');
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('.login-button')
    .should('be.visible')
    .click()
    .wait(1000);

  cy.wait(1000);

  cy.get(testData("login-email")).should('be.visible').type(email);

  cy.get(testData("login-password-field")).should('be.visible').type(password);

  cy.get(testData("login-password-show-hide-icon")).should('exist').click();

  cy.get(testData("login-password-field")).should('have.value', password);

  cy.get(testData("submit-button")).click();

  cy.wait(2000);
});

Cypress.Commands.add('passwordReset', (email) => {
  cy.get('.login-button').click();

  cy.contains('Text').click();

  cy.get('[class="modal-forgot-password"]')
    .should('exist')
    .and('contain', `Text`);

  cy.contains('Text').should('exist');

  cy.get('[name="forgot_email"]').click().type(email);

  cy.get('[type="submit').should('contain', 'Text').click();
});

Cypress.Commands.add('interceptLogin', () => {
  cy.intercept({
    method: "POST",
    url: "https://staging.sample.com.gr/users/login",
  }).as("userLogin");
});

Cypress.Commands.add('payByCash', () => {
  cy.get(testData('payment-methods-btn'))
    .wait(1000)
    .click();

  cy.get(testData('cash_fop'))
    .should('have.length', 1)
    .click();

  cy.get(testData('order-submit-btn'))
    .should('have.length', 1)
    .and('exist')
    .click();

  cy.wait(15000);
});

Cypress.Commands.add('payByCard', (card :string) => {
  cy.get(testData('payment-methods-btn'))
    .wait(1000)
    .click();

  cy.get(testData('credit_card_fop'))
    .should('have.length', 1)
    .click();

  cy.contains(card).click();

  cy.get(testData('order-submit-btn'))
    .should('have.length', 1)
    .and('exist')
    .click();

  cy.wait(15000);
});

Cypress.Commands.add('payByPaypal', (account: string) => {
  cy.get(testData('payment-methods-btn'))
    .wait(1000)
    .click();

  cy.get(testData('paypal_fop'))
    .should('have.length', 1)
    .click();

  cy.contains(account).click();

  cy.get(testData('order-submit-btn'))
    .should('have.length', 1)
    .and('exist')
    .click();

  cy.wait(15000);
});

Cypress.Commands.add('acceptAllCookies', () => {
  cy.contains("Accept All")
    .should('be.visible')
    .click();
});

Cypress.Commands.add('assertCoupon', (price) => {
  cy.get(testData('payslip-cart-contents')).parent().within(() => {
    cy.contains('Overall').should('exist');
    cy.contains(price).should('exist');
  });
});

Cypress.Commands.add('clearCart', () => {
  cy.wait(2000);
    
  cy.get("body").then(($body) => {
    if ($body.find('.clean-cart-wrapper').length > 0) {
      cy.get('[class="clean-cart-wrapper"]').click();
    } else {
      //do nothing
    }
  });
});

Cypress.Commands.add('addProducts', (products) => {
  products.map((product: { category: string, index: string, text: string }) => {
    cy.get(`#${product.category}locator > .locator(${product.index}) > .locator`)
      .scrollIntoView()
      .contains(product.text)
      .should('exist')
      .and('be.visible')
      .wait(2000)
      .click();

    cy.get(Selectors.MenuItem.SUBMIT_BUTTON)
      .click()
      .wait(1000);
    });
});

Cypress.Commands.add('compareCartTotalPrice', (price) => {
  cy.get(testData('payslip-total-price')).should('have.text', price);

  cy.get(testData('order-submit-btn-amount')).should('have.text', price);
});

Cypress.Commands.add('getCartPrice', () => {
  return cy.get('.cart-total-price').invoke('text');
});

Cypress.Commands.add('assertThankYouSuccessPage', (store, address, paymentMethod, price) => {
  cy.get(testData("order-success-checkmark")).should('exist');

  cy.contains("Text'").should('exist');

  cy.contains("Text").should('exist');

  cy.get(testData("back-btn")).should('exist');

  cy.contains('Text:').should('exist');
  
  cy.contains(store).should('exist');

  cy.contains('Text:').should('exist');

  cy.contains(address).should('exist');

  cy.contains('Text:').should('exist');

  cy.contains('Value:').should('exist');

  cy.contains('Value:').should('exist');

  cy.contains(paymentMethod).should('exist');

  cy.contains('Cart').should('exist');

  cy.get(testData("payslip-cart-contents"))
    .should('contain', 'Value')
    .and('exist');

  cy.get(testData("payslip-total-price")).should('have.text', price);

  cy.contains('Contact')
    .should('exist')
    .and('have.attr', 'data-testid', 'store-contact-info-title');

  cy.contains('Text.')
    .should('exist')
    .and('have.attr', 'data-testid', 'store-contact-info-subtitle');

  cy.contains('210250474700')
    .should('have.attr', 'type', 'button')
    .and('have.attr', 'data-testid', 'store-contact-info-button')
    .and('exist');

  cy.contains('Text')
     .should('exist')
     .and('have.attr', 'data-testid', 'brand-contact-info-title');

  cy.contains('Text.')
    .should('exist')
    .and('have.attr', 'data-testid', 'brand-contact-info-subtitle');

  cy.contains('Text')
    .should('exist')
    .and('have.attr', 'data-testid', 'brand-contact-helpcenter-btn')
    .and('have.attr', 'type', 'button')
    .and('be.enabled');

  cy.contains('+30 2102350000')
    .should('exist')
    .and('have.attr', 'data-testid', 'brand-contact-phone-button')
    .and('have.attr', 'type', 'button');
})

Cypress.Commands.add('selectServedAddress', (address) => {
  cy.contains("Text'")
    .scrollIntoView()
    .wait(1000)
    .click();

  cy.get(Selectors.Cart.SHOP_ADDRESS_MODAL)
    .wait(2000);

  cy.get('[placeholder="placeholder"]').click();

  cy.get('[id="address-item-0"]')
    .contains(address)
    .click()
    .wait(1000);

  cy.get(`div[data-cy="addressSearch"]`).parent().within(() => {
    cy.contains('Text').click();
  });
});

Cypress.Commands.add('selectServedAddressShopProfile', (address: string) => {
  cy.contains("Text")
    .scrollIntoView()
    .wait(1000)
    .click();

  cy.get('[data-cy="addressSearch"]').click().type(address);

  cy.get('[id="address-item-0"]').click();

  cy.get(`div[data-cy="addressSearch"]`).parent().within(() => {
    cy.contains('Text').click();
  });
  
  cy.get(`[class="modal-content"]`).parent().within(() => {
    cy.contains('Text').click();
  });
  
  cy.wait(2000);
});

Cypress.Commands.add('visitShop', (shopURL: string) => {
  cy.visit(shopURL);
});

Cypress.Commands.add('submitCart', () => {
  cy.get(Selectors.Cart.SUBMIT_CART_BUTTON)
   .scrollIntoView()
   .click()
   .wait(1000);
});

Cypress.Commands.add('compareThankYouTotalPrice', (price: string) => {
  cy.get(testData('payslip-total-price')).should('have.text', price);
});

Cypress.Commands.add('addCoupon', () => {
  cy.get(testData('coupon-btn')).click();

  cy.get('[placeholder="placeholder"]')
    .click()
    .type(Cypress.env('CHECKOUT_COUPON'));

  cy.contains('Προσθήκη').click();
});

Cypress.Commands.add('clickConsent', () => {
  cy.get(Selectors.ShopProfile.SMOKE_CATEGORY_TEXT).click({force:true});
});

Cypress.Commands.add('locator', () => {
  cy.wait(1000);

  cy.get('[id="locatorLink"]').click();

  cy.get(testData('locator')).click();

  cy.get(testData('locator')).click().wait(1000);

  cy.get(tobacco_optin)
    .find('[type="locator"]')
    .uncheck({force:true})
    .wait(2000);

  cy.get(testData('locator'))
    .click()
    .wait(2000);

});

Cypress.Commands.add('byAreaAthens', (areas) => {
  areas.map((area: { index: string, text: string, href: string }) => {
    cy.get(`.col(${area.index})`)
      .contains(area.text)
      .should('exist')
      .click();
  });
});

Cypress.Commands.add('byAreaThess', (area) => {
  area.map((area: { index: string, text: string, href: string }) => {
    cy.get(`.col(${area.index})`)
      .contains(area.text)
      .should('exist')
      .click()
    cy.url()
      .should('eq', addToAppURL(`url/`+ area.href));
  });
});

Cypress.Commands.add('shoplistSearch', (searchTerm) => {
  cy.get(Selectors.ShopList.SEARCH_FIELD).click({force: true});

  cy.get(Selectors.ShopList.SEARCH_FIELD)
    .type(searchTerm)
    .wait(1000);

  cy.get(Selectors.ShopList.SEARCH_FIELD_HELPTEXT).contains('text');

  cy.get(Selectors.ShopList.SEARCH_FIELD).type('{enter}');
});

Cypress.Commands.add('checkSearchLandingbyArea', (searchLanding) => {
  cy.get('#llocator').should('be.visible');

  cy.get('.locator').should('be.visible');

  cy.get('locator').should('be.visible');

  cy.get('#locatortab').should('exist');

  cy.get('#locator-tab')
    .should('exist')
    .and('have.class', 'active');

  cy.get('#locator-tab').should('exist');

  searchLanding.map((searchLanding: {area: string, searchTerm: string}) => {
    cy.get('.display-2')
      .should('contain', searchLanding.area)
      .and('contain', searchLanding.searchTerm)
      .and('contain', 'locator');
  });
});

Cypress.Commands.add('searchProfile', (SPSearch) => {
  SPSearch.map((SPSearch: { searchTerm: string }) => {
    cy.get(Selectors.Search.SHOP_PROFILE_SEARCH_FIELD)
      .click()
      .type(`${SPSearch.searchTerm}`)
      .should('have.value', `${SPSearch.searchTerm}`)
      .type('{enter}')
  });
});

Cypress.Commands.add('checkClosedSPModal', () => {
  cy.get(Selectors.ShopProfile.CLOSED_ITEM_MODAL_LEFT_COLUMN_HEADER)
    .should('exist')
    .and('have.text', 'Text');

  cy.get(Selectors.ShopProfile.CLOSED_ITEM_MODAL_SUGGESTED_RESTAURANTS)
    .should('exist')
    .and('have.text', 'Text:');

  cy.get(Selectors.ShopProfile.CLOSED_ITEM_MODAL_MENU_BUTTON).click();
});

Cypress.Commands.add('userLogout', () => {
  cy.wait(1000);
  cy.get('[id="dropdownMenuLink"]').click();
  cy.get(testData('account-btn')).click();
  cy.url().should('eq', addToAppURL('account/'));
  cy.get(testData('logout-btn')).click();
})

Cypress.Commands.add('typeAddress', (address) => {
  cy.get('[data-cy="addressSearch"]')
    .click()
    .wait(1000);

  cy.get('[data-cy="addressSearch"]')
    .type(address)
    .wait(2000);

  cy.contains(address).click()
 
  cy.contains("Text").click()
 
  cy.contains('Text')
    .should('exist')
    .click()
    .wait(2000);
});

Cypress.Commands.add('typeAddressPin', (address) => {
  cy.get('[data-cy="addressSearch"]')
    .click()
    .wait(1000);

  cy.get('[data-cy="addressSearch"]')
    .type(address)
    .wait(2000);

  cy.contains(address).click();

  cy.contains("Text").click();

  cy.get('#address')
    .clear()
    .type('number');
    
  cy.contains("Text")
    .click()
    .wait(1500);

  cy.contains("Text").click();

  cy.get('#address-confirm-component').should('contain','Text');

  cy.contains('Confirm').click();
});

Cypress.Commands.add('selectFirstAvailableAddressByCart', () => {
  cy.contains('Text')
    .should('exist')
    .wait(2000)
    .click()
    .wait(2000);

  //...
});

Cypress.Commands.add('CheckoutAssertionsbyCash', (address, floor, doorbell, comments) => {
  cy.contains('Text').should('exist');

  cy.get(testData('btn')).should('contain', 'Delivery');

  cy.get(testData('user-address-info'))
    .should('contain', address)
    .and('contain', floor)
    .and('contain', doorbell)
    .and('contain', comments);

  cy.get(testData('coupon-btn'))
    .should('contain', 'Text')
    .and('exist');

  cy.get(testData('payment-methods-btn')).should('exist');

  cy.get(checkout_contactless)
    .should('contain', 'Text')
    .and('contain', 'Text')
    .and('exist');

  cy.get(checkout_no_cutlery)
    .should('exist')
    .and('contain', 'Text')
    .and('contain', 'Text.');

  cy.get(testData('payslip_locator')).should('exist').and('contain', 'Καλάθι');

  cy.get(testData('payslip_locator')).parent().within(() => {
    cy.get(testData('payslip_locator_price')).should('exist');
  });

  cy.get(testData('order-submit-btn')).should('have.attr', 'type', 'button').and('be.enabled');

  cy.get(testData('allergens-btn')).should('exist').and('contain', 'text').click();

  cy.contains('text').should('exist');

  cy.contains('text').should('exist');

  cy.contains('Text').should('have.attr', 'href', '/site-assets/documents/documents.pdf');

  cy.contains('Phone Text').should('have.attr', 'href', 'tel:+000000000000000');
});

Cypress.Commands.add('CheckoutAssertionsbyCard', (address, floor, doorbell, comments) => {
  cy.contains('Text').should('exist');

  cy.get(testData('locator-btn')).should('contain', 'Sthnbv');

  cy.get(testData('user-address-info'))
    .should('contain', address)
    .and('contain', floor)
    .and('contain', doorbell)
    .and('contain', comments);

  cy.get(testData('coupon-btn'))
    .should('contain', 'Text')
    .and('exist');

  cy.get(testData('payment-btn')).should('exist');

  cy.get(testData('order-reminder')).should('exist').and('be.visible');

  cy.get(checkout_contactless)
    .should('contain', 'Text')
    .and('contain', 'Text')
    .and('exist');

  cy.get(checkout_no_cutlery)
    .should('exist')
    .and('contain', 'Text')
    .and('contain', 'Text.');

  cy.get(testData('payslip-contents')).should('exist').and('contain', 'Text');

  cy.get(testData('payslip-contents')).parent().within(() => {
    cy.get(testData('locator')).should('exist');
  });

  cy.get(testData('submit-btn')).should('have.attr', 'type', 'button').and('be.enabled');

  cy.get(testData('allergens-btn')).should('exist').and('contain', 'Text').click();

  cy.contains('Text').should('exist');

  cy.contains('Text').should('exist');

  cy.contains('Text').should('have.attr', 'href', '/site-assets/documents/documents.pdf');

  cy.contains('Phone Text').should('have.attr', 'href', 'tel:+');
});