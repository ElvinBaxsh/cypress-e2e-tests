import inventoryPage from '../../pages/InventoryPage';
import cartPage from '../../pages/CartPage';
import checkoutPage from '../../pages/CheckoutPage';

const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];

describe('Checkout', () => {
  beforeEach(() => {
    cy.fixture('customer').as('customer');
    cy.loginAs('standard_user');
    PRODUCTS.forEach((product) => inventoryPage.addToCart(product));
    inventoryPage.openCart();
    cartPage.itemNames.should('have.length', PRODUCTS.length);
    cartPage.checkout();
  });

  it('user completes an order end to end', function () {
    checkoutPage.fillInfo(this.customer);
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    checkoutPage.finish();
    checkoutPage.completeHeader.should('have.text', 'Thank you for your order!');
  });

  it('order total = item prices + tax', function () {
    checkoutPage.fillInfo(this.customer);
    cy.getByTest('inventory-item-price').should('have.length', PRODUCTS.length);

    checkoutPage.getItemPrices().then((prices) => {
      const itemsSum = prices.reduce((sum, p) => sum + p, 0);
      checkoutPage.getAmount('subtotal-label').should('be.closeTo', itemsSum, 0.001);
    });
    checkoutPage.getAmount('subtotal-label').then((subtotal) => {
      checkoutPage.getAmount('tax-label').then((tax) => {
        checkoutPage.getAmount('total-label').should('be.closeTo', subtotal + tax, 0.001);
      });
    });
  });

  const requiredFields = [
    { field: 'firstName', label: 'first name', message: 'Error: First Name is required' },
    { field: 'lastName', label: 'last name', message: 'Error: Last Name is required' },
    { field: 'postalCode', label: 'postal code', message: 'Error: Postal Code is required' },
  ];

  requiredFields.forEach(({ field, label, message }) => {
    it(`validation: ${label} is required`, function () {
      checkoutPage.fillInfo({ ...this.customer, [field]: '' });
      checkoutPage.error.should('have.text', message);
    });
  });
});
