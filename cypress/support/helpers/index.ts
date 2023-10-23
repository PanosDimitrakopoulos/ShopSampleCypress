import {selectProductFromMenu} from "./MarketProfile";

function addToAppURL(url: string){
    return `${Cypress.env('APP_URL')}/${url}`
}

function testData(selector: string){
    return `[${Cypress.env('DATA_TEST_ATTRIBUTE')} = ${selector}]`
}

const Helpers = {
    selectProductFromMenu,
    addToAppURL,
    testData
};

export default Helpers;