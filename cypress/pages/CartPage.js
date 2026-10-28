class CartPage {
  get itemNames() {
    return cy.getByTest('inventory-item-name');
  }

  removeItem(name) {
    cy.contains('[data-test="inventory-item"]', name).contains('button', 'Remove').click();
  }

  checkout() {
    cy.getByTest('checkout').click();
    cy.location('pathname').should('eq', '/checkout-step-one.html');
  }
}

export default new CartPage();
