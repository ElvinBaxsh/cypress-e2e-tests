import 'cypress-mochawesome-reporter/register';
import './commands';

// Keep product images out of the browser cache (needed for Firefox, where the cache cannot be cleared),
// so the network tests always see real image requests.
beforeEach(() => {
  cy.intercept('GET', '**/assets/*-1200x1500-*.jpg', (req) => {
    req.on('response', (res) => {
      res.headers['cache-control'] = 'no-store';
    });
  });
});
