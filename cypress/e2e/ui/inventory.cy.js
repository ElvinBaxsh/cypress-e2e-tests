import inventoryPage from '../../pages/InventoryPage';

describe('Products', () => {
  beforeEach(() => {
    cy.loginAs('standard_user');
  });

  it('shows 6 products', () => {
    inventoryPage.items.should('have.length', 6);
  });

  it('sort by name Z to A', () => {
    inventoryPage.sortBy('za');
    inventoryPage.getNames().then((names) => {
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  });

  it('sort by price low to high', () => {
    inventoryPage.sortBy('lohi');
    inventoryPage.getPrices().then((prices) => {
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });

  it('sort by price high to low', () => {
    inventoryPage.sortBy('hilo');
    inventoryPage.getPrices().then((prices) => {
      expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
    });
  });

  it('product details page opens from the list', () => {
    const name = 'Sauce Labs Backpack';
    inventoryPage.itemNames.contains(name).click();
    cy.location('pathname').should('eq', '/inventory-item.html');
    cy.getByTest('back-to-products').should('be.visible');
    cy.getByTest('inventory-item-name').should('have.length', 1).and('have.text', name);
  });
});
