import inventoryPage from '../../pages/InventoryPage';
import cartPage from '../../pages/CartPage';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

describe('Cart', () => {
  beforeEach(() => {
    cy.loginAs('standard_user');
  });

  it('adding products updates the cart badge', () => {
    inventoryPage.addToCart(BACKPACK);
    inventoryPage.cartBadge.should('have.text', '1');
    inventoryPage.addToCart(BIKE_LIGHT);
    inventoryPage.cartBadge.should('have.text', '2');
  });

  it('removing a product from the list updates the badge', () => {
    inventoryPage.addToCart(BACKPACK);
    inventoryPage.removeFromCart(BACKPACK);
    inventoryPage.cartBadge.should('not.exist');
  });

  it('cart shows the added products', () => {
    inventoryPage.addToCart(BACKPACK);
    inventoryPage.addToCart(BIKE_LIGHT);
    inventoryPage.openCart();
    cartPage.itemNames.should('have.length', 2);
    cartPage.itemNames.eq(0).should('have.text', BACKPACK);
    cartPage.itemNames.eq(1).should('have.text', BIKE_LIGHT);
  });

  it('product can be removed inside the cart', () => {
    inventoryPage.addToCart(BACKPACK);
    inventoryPage.addToCart(BIKE_LIGHT);
    inventoryPage.openCart();
    cartPage.removeItem(BACKPACK);
    cartPage.itemNames.should('have.length', 1).and('have.text', BIKE_LIGHT);
  });

  it('cart items stay after page reload', () => {
    inventoryPage.addToCart(BACKPACK);
    inventoryPage.openCart();
    cy.reload();
    cartPage.itemNames.should('have.length', 1).and('have.text', BACKPACK);
  });
});
