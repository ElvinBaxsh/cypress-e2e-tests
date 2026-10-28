import loginPage from '../../pages/LoginPage';
import inventoryPage from '../../pages/InventoryPage';

describe('Login', () => {
  beforeEach(function () {
    cy.fixture('users').as('users');
    loginPage.open();
  });

  it('standard user can log in', function () {
    loginPage.login(this.users.standard, this.users.password);
    inventoryPage.shouldBeLoaded();
  });

  it('locked out user sees an error', function () {
    loginPage.login(this.users.lockedOut, this.users.password);
    loginPage.error.should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('wrong password is rejected', function () {
    loginPage.login(this.users.standard, 'wrong_password');
    loginPage.error.should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  const emptyFields = [
    { case: 'empty username', username: '', password: 'secret_sauce', message: 'Epic sadface: Username is required' },
    { case: 'empty password', username: 'standard_user', password: '', message: 'Epic sadface: Password is required' },
  ];

  emptyFields.forEach(({ case: name, username, password, message }) => {
    it(`validation: ${name}`, () => {
      loginPage.login(username, password);
      loginPage.error.should('have.text', message);
    });
  });

  it('inventory page is not reachable without login', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.location('pathname').should('eq', '/');
    loginPage.error.should('have.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });

  it('user can log out', function () {
    loginPage.login(this.users.standard, this.users.password);
    inventoryPage.logout();
    cy.location('pathname').should('eq', '/');
    loginPage.loginButton.should('be.visible');
  });
});
