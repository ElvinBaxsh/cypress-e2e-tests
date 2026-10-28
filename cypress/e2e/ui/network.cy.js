import inventoryPage from '../../pages/InventoryPage';

const PRODUCT_IMAGES = '**/assets/*-1200x1500-*.jpg';

// cy.intercept examples: watching real network traffic and simulating failures.
describe('Network', () => {
  beforeEach(() => {
    // Chrome, Edge and Electron may still hold the images from earlier runs
    if (Cypress.browser.family === 'chromium') {
      cy.wrap(Cypress.automation('remote:debugger:protocol', { command: 'Network.clearBrowserCache' }));
    }
  });

  it('product images load successfully', () => {
    cy.loginAs('standard_user');
    cy.intercept('GET', PRODUCT_IMAGES).as('image');
    cy.reload();
    cy.wait('@image').its('response.statusCode').should('be.oneOf', [200, 304]);
    cy.get('img.inventory_item_img').should('have.length', 6).and(($imgs) => {
      $imgs.each((_, img) => expect(img.naturalWidth, img.alt).to.be.greaterThan(0));
    });
  });

  it('store still works when product images fail to load', () => {
    cy.loginAs('standard_user');
    cy.intercept('GET', PRODUCT_IMAGES, { statusCode: 404 }).as('brokenImage');
    cy.reload();
    cy.wait('@brokenImage');

    inventoryPage.items.should('have.length', 6);
    cy.get('img.inventory_item_img').first().should(($img) => expect($img[0].naturalWidth).to.eq(0));
    inventoryPage.addToCart('Sauce Labs Backpack');
    inventoryPage.cartBadge.should('have.text', '1');
  });
});
