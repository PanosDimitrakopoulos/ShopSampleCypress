import Helpers from "@support/helpers";
import {config} from "@support/helpers/creds"

Cypress.config('scrollBehavior', 'center');

//Locators
const {addToAppURL,testData} = Helpers;
const { userEmail, userPassword } = config;
const checkout_contactless = testData('order_attr_0123456789abcdef');
const checkout_tip = testData('order_attr_0123456789abcdefgeeas');
const checkout_no_cutlery = testData('order_attr_0123456789abcdefsdasd');
const productData = [
    { category: 'category', index: '4', text: 'Item 1' },
    { category: 'category 2', index: '6', text: 'Item 2' },
    { category: 'category 3', index: '1', text: 'Item 3' },
    { category: 'category 4', index: '2', text: 'Item4' }
  ];
const CartMessage = 'CartMessage'
const price1 = 'price1'
const couponValue = 'value'
const paypalEmail = 'email@email.com'

//URLs
const url1 = 'params'

//Functions
function assertCartFooterTitle(title: string) {
    cy.get(`div[class="cart-footer"]`).parent().within(() => {
      cy.get(`[class="cart-progress-bar_title"]`).should('contain', title);
    });
  }

describe('Order flow with cash', () => {
    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit(addToAppURL(url1));
        cy.acceptAllCookies();
        cy.interceptLogin();
        cy.login(userEmail, userPassword).wait('@userLogin');
        cy.selectFirstAvailableAddressByCart();
        cy.clearCart();
      });

    it('User adds items in cart & completes order', () => {
        cy.addProducts(productData);

        assertCartFooterTitle(CartMessage);
    
        cy.addProducts([productData[3]]);

        cy.getCartPrice().then((price) => {
            cy.submitCart();

            cy.get('body').then((upsell) => {
                if (upsell.text().includes('Do not forget the following')) {
                    cy.contains('Continue').click({force: true});
                } else {
                    //do nothing
                }
            });

            cy.compareCartTotalPrice(price);

            cy.payByCash();

            cy.compareThankYouTotalPrice(price);
        });
    });

    it('User adds items in cart & completes order by Card', () => {
        cy.addProducts(productData);

        cy.getCartPrice().then((price) => {
            cy.submitCart();

            cy.get('body').then((upsell) => {
                if (upsell.text().includes('Do not forget the following')) {
                    cy.contains('Continue').click({force: true});
                } else {
                    //do nothing
                }
            });

            cy.payByCard('xxxx');

            cy.compareThankYouTotalPrice(price);
        });
    });

    it('User adds items in cart & completes order by Card and adds tip, CSR & asserts', () => {
        cy.addProducts(productData);

        cy.getCartPrice().then((price) => {
            cy.submitCart();

            cy.get('body').then((upsell) => {
                if (upsell.text().includes('Do not forget the following')) {
                    cy.contains('Continue').click({force: true});
                } else {
                    //do nothing
                }
            });

            cy.get(testData('payment-methods-btn')).click();

            cy.get(testData('credit_card_1')).click();

            cy.contains('xxxx').click();

            cy.get(checkout_tip).parent().within(() => {
                cy.get('[id="attr_value_value"]').click();
            });

            cy.get(testData('order')).should('exist').click();

            cy.get(testData('payslip-cart-contents')).parent().within(() => {
                cy.contains('text1')...
            });
          
            cy.get(testData('order-submit-btn')).should('exist').click();

            cy.assertThankYouSuccessPage("Invoice Contents", "1", "2", "3");
        });
    });

    it('User adds items in cart & completes order by Paypal', () => {
        cy.addProducts(productData);

        cy.getCartPrice().then((price) => {
            cy.submitCart();

            cy.get('body').then((upsell) => {
                if (upsell.text().includes('Do not forget the following')) {
                    cy.contains('Continue').click({force: true});
                } else {
                    //do nothing
                }
            });

            cy.payByPaypal(paypalEmail);

            cy.compareThankYouTotalPrice(price);
        });
    });

    it('User adds items in cart & completes order with coupon', () => {
        cy.addProducts(productData);

        cy.getCartPrice().then((price) => {
            cy.submitCart();

            cy.get('body').then((upsell) => {
                if (upsell.text().includes('Do not forget the following')) {
                    cy.contains('Continue').click({force: true});
                } else {
                    //do nothing
                }
            });

            cy.addCoupon();

            cy.assertCoupon(couponValue);

            cy.getCartPrice().then((price) => {
                cy.payByCash();

                cy.compareThankYouTotalPrice(price1);
            });
        });
    });
});

