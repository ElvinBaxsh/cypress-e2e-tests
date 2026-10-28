// Shortcut for the data-test attributes used on saucedemo.com
Cypress.Commands.add('getByTest', (id) => cy.get(`[data-test="${id}"]`));

// Logs in once per user and reuses the session (cookies + localStorage) in later tests.
Cypress.Commands.add('loginAs', (username) => {
  cy.fixture('users').then(({ password }) => {
    cy.session(username, () => {
      cy.visit('/');
      cy.getByTest('username').type(username);
      cy.getByTest('password').type(password, { log: false });
      cy.getByTest('login-button').click();
      cy.location('pathname').should('eq', '/inventory.html');
    });
  });
  cy.visit('/inventory.html', { failOnStatusCode: false });
});

const API_URL = 'https://automationexercise.com/api';

// automationexercise.com sends JSON with a text/html header, so the body can arrive as a string.
Cypress.Commands.add('apiRequest', (method, path, form) => {
  return cy
    .request({ method, url: `${API_URL}${path}`, form: !!form, body: form })
    .then((response) => {
      expect(response.status).to.eq(200);
      return typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
    });
});
