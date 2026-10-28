const toNumber = (text) => Number(text.replace(/[^0-9.]/g, ''));

class CheckoutPage {
  get error() {
    return cy.getByTest('error');
  }

  get completeHeader() {
    return cy.getByTest('complete-header');
  }

  fillInfo({ firstName, lastName, postalCode }) {
    if (firstName) cy.getByTest('firstName').type(firstName);
    if (lastName) cy.getByTest('lastName').type(lastName);
    if (postalCode) cy.getByTest('postalCode').type(postalCode);
    cy.getByTest('continue').click();
  }

  getItemPrices() {
    return cy.getByTest('inventory-item-price').then(($els) => Cypress._.map($els, (el) => toNumber(el.innerText)));
  }

  // "Item total: $39.98" -> 39.98
  getAmount(testId) {
    return cy.getByTest(testId).invoke('text').then(toNumber);
  }

  finish() {
    cy.getByTest('finish').click();
  }
}

export default new CheckoutPage();
