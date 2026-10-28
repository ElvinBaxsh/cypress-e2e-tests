# Cypress E2E Tests

[![Cypress Tests](https://github.com/ElvinBaxsh/cypress-e2e-tests/actions/workflows/cypress.yml/badge.svg)](https://github.com/ElvinBaxsh/cypress-e2e-tests/actions/workflows/cypress.yml)

UI, network and API test automation with **Cypress** and **JavaScript**.

- **UI tests:** [Sauce Demo](https://www.saucedemo.com), an e-commerce demo store, on Chrome, Firefox and Edge
- **API tests:** [Automation Exercise](https://automationexercise.com/api_list) public REST API

The same scenarios are also automated with Playwright and TypeScript: [playwright-e2e-tests](https://github.com/ElvinBaxsh/playwright-e2e-tests).

## What is covered

| Area | Scenarios |
|---|---|
| Login | valid login, locked out user, wrong password, required fields, protected page without login, logout |
| Products | product count, sort by name and price, product details page |
| Cart | add and remove products, cart badge, cart content, cart kept after reload |
| Checkout | full order flow, total = items + tax, required field validation |
| Network | product images load, store still works when images fail (`cy.intercept` stub) |
| API | product and brand lists, product search, unsupported methods (405), missing parameters (400), unknown user (404) |

**32 test cases** in total, each UI case runs on 3 browsers.

## Approach

- **Page Object Model:** selectors and actions live in `cypress/pages/`, specs only describe behaviour
- **Custom commands:** `cy.getByTest()`, `cy.loginAs()` and `cy.apiRequest()` in `cypress/support/commands.js`
- **Fast login with `cy.session`:** the login is done once and the session is reused across tests
- **Network control with `cy.intercept`:** spying on real requests and simulating server errors
- **Test data in fixtures:** `cypress/fixtures/*.json`
- **Data-driven tests:** validation cases are generated from data tables
- **Reports:** Mochawesome HTML report with screenshots of failed tests
- **CI:** GitHub Actions runs every browser in parallel on each push, pull request and once a week

## Run locally

```bash
npm install
npm run cy:open       # interactive mode
npm test              # all tests, headless
npm run test:ui       # UI tests only
npm run test:api      # API tests only
npm run test:chrome   # in Chrome
```

The HTML report is saved to `cypress/reports/index.html`.

## Playwright vs Cypress, from this project

| | Playwright | Cypress |
|---|---|---|
| Language | TypeScript | JavaScript |
| Browsers | Chromium, Firefox, WebKit (Safari) | Chrome, Firefox, Edge, Electron |
| Waiting | `await` + auto-waiting locators | command queue + automatic retries |
| Login reuse | custom fixture | `cy.session` |
| Network | `page.route` | `cy.intercept` |
| API tests | `request` fixture | `cy.request` |

## Tech stack

Cypress · JavaScript · Mochawesome · GitHub Actions
