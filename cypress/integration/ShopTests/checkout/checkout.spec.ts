import Helpers from "@support/helpers";

Cypress.config('scrollBehavior', 'center');

const { addToAppURL, testData } = Helpers;

const paramUrl = 'param1/param2/param3';
const userEmail = Cypress.env('USER_EMAIL');
const userPassword = Cypress.env('USER_PASSWORD');
const userAddress = "Address";
const CartMessage = "CartMessage"

const productData = [
    { category: 'category', index: '4', text: 'Item 1' },
    { category: 'category 2', index: '6', text: 'Item 2' },
    { category: 'category 3', index: '1', text: 'Item 3' }
];

function assertCartFooterTitle(title: string) {
  cy.get(`div[class="cart-footer"]`).parent().within(() => {
    cy.get(`[class="cart-progress-bar__title"]`).should('contain', title);
  });
}

function submitCartAndHandleUpsell(price: any) { //We realize that the user may find a string rather than a number. This is for example purposes ONLY.
  cy.submitCart();
  cy.get('body').then((upsell) => {
    if (upsell.text().includes('Take a look at these')) {
      cy.contains('Continue').click({ force: true });
    } else {
      //do nothing
    }
  });
  cy.compareCartTotalPrice(price);
}

describe('Order flow with cash', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(addToAppURL(paramUrl));
    cy.acceptAllCookies();
    cy.interceptLogin();
    cy.login(userEmail, userPassword).wait('@userLogin');
    cy.selectFirstAvailableAddressByCart();
    cy.clearCart();
  });

  it('Asserts checkout elements with Cash payment method', () => {
    cy.addProducts(productData);

    assertCartFooterTitle(CartMessage);

    cy.addProducts([productData[1]]);

    cy.getCartPrice().then((price) => {
      submitCartAndHandleUpsell(price);

      cy.get(testData('payment-methods-btn')).click();
      cy.get(testData('cash_fop')).click();
      cy.get(testData('payment-methods-btn')).should('contain', 'Μετρητά');

      cy.CheckoutAssertionsbyCash('Address, AddressNumber, Postal Code', 'Floor', 'Name', 'Comment.');
    });
  });

  it('Asserts checkout elements with Card payment method', () => {
    cy.addProducts(productData);

    assertCartFooterTitle(CartMessage);

    cy.addProducts([productData[2]]);

    cy.getCartPrice().then((price) => {
      submitCartAndHandleUpsell(price);

      cy.get(testData('payment-methods-btn')).click();
      cy.get(testData('credit_card_fop')).click();
      cy.contains('xxxx').click();

      cy.CheckoutAssertionsbyCard('Address, AddressNumber, Postal Code', 'Floor', 'Name', 'Comment.');
    });
  });
});

describe('New user flows', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit(addToAppURL(paramUrl));
    cy.acceptAllCookies();
    cy.interceptLogin();
    cy.registerRandom(userEmail, userPassword).wait(2000);
    cy.selectServedAddressShopProfile(userAddress);
    cy.clearCart();
  });

  it('User adds items in cart & completes order', () => {
    cy.addProducts(productData);

    assertCartFooterTitle(CartMessage);

    cy.addProducts([productData[1]]);

    cy.getCartPrice().then((price) => {
      submitCartAndHandleUpsell(price);
      cy.newUserCheckoutAssert();
    });
  });
});