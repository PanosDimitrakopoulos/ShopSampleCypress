import Selectors from "@support/selectors";
import Helpers from "@support/helpers";

Cypress.config('scrollBehavior', 'center');

//Locators
const {addToAppURL} = Helpers;
const fullAddress = 'FullAddress'
const fullAddress2 = 'FullAddress'
const nav_tag = '#navigation'
const locator_1 = '#tag > main > class > .etc > .tec'
const locator_2 = '.categories-count'
const locator_3 = 'locator3'
const locator_4 = '.container > :nth-child(2) > .m-0'
const locator_5 = 'locator5'
const locator_6 = 'locator_6'
const locator_7 = 'locator_7'
const locator_8 = 'locator_8'
const locator_9 = 'locator_9'
const locator_10 = 'locator_10'
const area_data = [{index: '87', text: 'Area', href: 'area-href'}]

//URLs
const baseUrl = Cypress.env('APP_URL')
const url1 = 'param1'
const url2 = 'param2'
const url3 = 'param3'
const url4 = 'param4'

var time = new Date().getHours();

describe('Navigation - LoggedOut Search', () => {
  beforeEach(() => {
    cy.visit(baseUrl);

    cy.acceptAllCookies();
  });

  it('Navigation - Search by Variety', () => {
    cy.visit(addToAppURL('kafes-delivery'));

    cy.url()
      .should('eq', addToAppURL(url1));

    cy.typeAddress(fullAddress);

    cy.get(Selectors.ShopList.CUISINES_SIDEBAR_COFFEE)
      .scrollIntoView()
      .should('have.class', 'font-weight-normal')
      .and('have.text', 'Text1')
      .and('have.attr', 'for', 'text');

    cy.get('.input-radio-mark > #text').should('be.checked');

    cy.get(Selectors.ShopList.LAUNCHER_VERTICALS_FOOD_POS_1)
      .should('have.text', 'Text & Text')
      .and('have.class', 'active')
      .and('be.visible');
  });

  it('Navigation - Search By Area', () => {
    cy.visit(addToAppURL(url2));

    cy.byAreaAthens(area_data)

    cy.get('.display-2')
      .contains('Area Text')
      .and('be.visible');

    cy.get(nav_tag)
      .should('contain', 'text')
      .and('contain', 'text')
      .and('contain', 'text')
      .and('have.id', 'navigation')
      .and('have.class', 'breadcrumb')
      .and('be.visible');

    if (time >= 12) {
      cy.get('.icons > .lazyloaded')
        .should('have.attr', 'alt', 'IconText')
        .and('be.visible');
    } else {
      //do nothing
    }

    cy.contains('Variety')
      .click()
      .wait(1000);

    cy.contains('Variety 2')
      .scrollIntoView()
      .should('be.visible')
      .click({force: true});

    cy.contains('Variety 3')
      .click()
      .wait(1000);

    cy.contains('Variety 4')
      .scrollIntoView()
      .should('have.attr', 'for', 'sorter-delivery_eta')
      .and('be.visible')
      .click()
      .wait(1000);
        
    cy.get(locator_1).click()
        
    cy.get(locator_2)
      .should('have.class', 'rounded-circle')
      .and('have.text', '2')
      .and('be.visible')
      .end();  
    });

  it('Navigation - Search via Stores', () => {
    cy.visit(addToAppURL(url3));
  
    cy.url()
      .should('eq', addToAppURL(url3));
  
    cy.get(locator_3)
      .should('have.class', 'class_name')
      .and('contain', 'Text')
      .and('be.visible');
  
    cy.get('.hero')
      .should('have.class', 'hero')
      .and('be.visible');
  
    cy.get('.container > .etc > .h1')
      .should('have.class', 'h1')
      .and('contain', 'text')
      .and('be.visible');
  
    cy.get(locator_4)
      .should('contain', 'BigText')
      .and('be.visible');
  
    cy.typeAddress(fullAddress);
  
    cy.get(Selectors.ShopList.LAUNCHER_VERTICALS_LOCAL_STORES_POS_4)
      .should('have.class', 'active')
      .and('have.text', 'Text')
      .and('be.visible');
  
    cy.get(locator_5)
      .should('have.class', 'class_name')
      .and('be.visible');
  
    cy.get('body').then(($body) => {
      if ($body.text().includes('text')) {
        cy.get('.htmlcomponent')
          .should('have.class', 'classname')
          .and('be.visible');
      } else {
        //do nothing
      }
    });
  
    cy.get(locator_6)
      .should('have.class', 'Locator6Name')
      .and('be.visible');
  

    cy.get('body').then(($body) => {
      if ($body.text().includes('Text')) {
        cy.contains('text')
          .should('exist')
          .and('be.visible');
      } else {
        //do nothing
      }
    });
  
    cy.get(locator_7)
      .should('have.class', 'className')
      .and('be.visible');
  
    cy.get(locator_8)
      .contains('text')
      .should('be.visible');
  });

  it('Navigation - Empty Search Landing Page', () => {
    cy.visit(addToAppURL(url4));
  
    cy.url()
      .should('eq', addToAppURL(url4));
  
    cy.get(locator_9)
      .should('have.class', 'className')
      .and('contain', 'text')
      .and('be.visible');
  
    cy.get('.hero')
      .should('have.class', 'hero')
      .and('be.visible');
  
    cy.get(locator_5)
      .should('have.class', 'h1')
      .and('contain', 'text')
      .and('be.visible');
  
    cy.get('locator_4')
      .should('contain', 'text')
      .and('be.visible');
  
    cy.typeAddress(fullAddress2);
  
    cy.get(Selectors.ShopList.LAUNCHER_VERTICALS_LOCAL_STORES_POS_4)
      .should('not.exist');

    cy.get(Selectors.ShopList.LAUNCHER_VERTICALS_FOOD_POS_1)
      .should('be.visible')
      .and('contain', 'text');

    cy.get(locator_10)
      .should('be.visible')
      .and('have.class', 'className')
      .and('contain', 'error_1')
      .and('contain', 'error_2')
      .and('contain', 'error_3')
      .and('contain', 'error_4')
      .and('contain', 'error_5');
  });
});