const toNumber = (text) => Number(text.replace(/[^0-9.]/g, ''));

class InventoryPage {
  get title() {
    return cy.getByTest('title');
  }

  get items() {
    return cy.getByTest('inventory-item');
  }

  get itemNames() {
    return cy.getByTest('inventory-item-name');
  }

  get cartBadge() {
    return cy.getByTest('shopping-cart-badge');
  }

  shouldBeLoaded() {
    cy.location('pathname').should('eq', '/inventory.html');
    this.title.should('have.text', 'Products');
  }

  product(name) {
    return cy.contains('[data-test="inventory-item"]', name);
  }

  addToCart(name) {
    this.product(name).contains('button', 'Add to cart').click();
  }

  removeFromCart(name) {
    this.product(name).contains('button', 'Remove').click();
  }

  sortBy(option) {
    cy.getByTest('product-sort-container').select(option);
  }

  getNames() {
    return this.itemNames.then(($els) => Cypress._.map($els, 'innerText'));
  }

  getPrices() {
    return cy.getByTest('inventory-item-price').then(($els) => Cypress._.map($els, (el) => toNumber(el.innerText)));
  }

  openCart() {
    cy.getByTest('shopping-cart-link').click();
  }

  logout() {
    cy.contains('button', 'Open Menu').click({ force: true });
    cy.getByTest('logout-sidebar-link').click();
  }
}

export default new InventoryPage();
