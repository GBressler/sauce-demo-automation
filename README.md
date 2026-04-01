# Sauce Demo Automation – QA Challenge

Automated test suite for [Sauce Demo](https://www.saucedemo.com/) built with **Playwright + Cucumber (BDD)** and the **Page Object Model** design pattern.

---

## User Story

> As a Sauce Demo customer,  
> I want to be able to log in, add products to the cart, and complete a purchase,  
> so that I can acquire the products I need.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation |
| [Cucumber.js](https://cucumber.io/) | BDD test runner |
| [Gherkin](https://cucumber.io/docs/gherkin/) | Feature file syntax |
| Page Object Model | Design pattern |

---

## Project Structure
```
├── features/               # Gherkin feature files
│   ├── login.feature
│   ├── products.feature
│   ├── cart.feature
│   └── checkout.feature
├── step-definitions/       # Cucumber step implementations
├── page-objects/           # POM classes (one per page)
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── playwright.config.js
├── cucumber.js
└── .env                    # Credentials (not committed — see setup below)
```

---

## Setup

### Prerequisites

- Node.js **20.x, 22.x, or 24.x** (Playwright requirement)
- npm

### Install dependencies
```bash
npm install
npx playwright install
```

> **Linux only:** if you hit a missing library error, run:
> ```bash
> sudo apt-get install libavif13
> ```

### Environment variables

Create a `.env` file in the project root. The credentials are publicly available on the [Sauce Demo](https://www.saucedemo.com/) login page.
> The `.env` file is listed in `.gitignore` and will not be committed to version control.

---

## Running Tests

### Full suite
```bash
npm test                  # All Cucumber scenarios
npm run test:all          # Explicit glob — same result
```

### By feature
```bash
npm run test:login        # Login scenarios
npm run test:products     # Add product to cart
npm run test:cart         # View cart contents
npm run test:checkout     # Complete purchase flow
```

### Playwright runner
```bash
npm run test:playwright   # Headless
npm run test:headed       # With browser UI visible
```

---

## Test Scenarios

### Login (`login.feature`)
- ✅ Successful login with valid credentials (`standard_user`)
- ✅ Failed login with invalid credentials (`invalid_user` / wrong password)
- ✅ Failed login with `locked_out_user` — verifies error message

### Products (`products.feature`)
- ✅ Add a product to the cart from the products page
- ✅ Cart badge updates correctly

### Cart (`cart.feature`)
- ✅ Added products appear in the shopping cart
- ✅ Product name, price, and quantity are correct

### Checkout (`checkout.feature`)
- ✅ Complete checkout flow from cart to order confirmation
- ✅ Confirmation message is displayed on success

---

## Design Pattern

This project uses the **Page Object Model (POM)**. Each page of the application has a dedicated class in `page-objects/` that encapsulates its locators and interactions. Step definitions call these page objects and contain no selectors themselves. `BasePage.js` holds shared logic (navigation, waits) that all page classes inherit.

This separates test intent (Gherkin) from implementation (page objects), making tests easier to maintain when the UI changes.

---

## Automation Strategy

### Approach
Tests are written in **BDD style** using Gherkin so that acceptance criteria map directly to executable scenarios. Each criterion from the user story has a corresponding feature file.

### Pattern: Page Object Model
Locators and page interactions are centralized in page classes. If a selector changes, only the page object needs updating — not every step definition that uses it.

### User coverage
All required user types and credential scenarios are covered:
- `standard_user` + valid password — happy path (login, cart, checkout)
- `standard_user` + wrong password — negative login scenario
- `locked_out_user` — verifies the locked account error state

### Trade-offs considered
- Cucumber adds overhead vs. plain Playwright tests, but was chosen to satisfy the BDD requirement and keep scenarios readable as acceptance criteria.
- Feature files are split by page/flow rather than by user type to keep each file focused and independently runnable via the `test:*` scripts.
