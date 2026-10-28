class LoginPage {
  get username() {
    return cy.getByTest('username');
  }

  get password() {
    return cy.getByTest('password');
  }

  get loginButton() {
    return cy.getByTest('login-button');
  }

  get error() {
    return cy.getByTest('error');
  }

  open() {
    cy.visit('/');
  }

  login(username, password) {
    if (username) this.username.type(username);
    if (password) this.password.type(password, { log: false });
    this.loginButton.click();
  }
}

export default new LoginPage();
