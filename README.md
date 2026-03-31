# Sauce Demo Automation

This project automates testing for https://www.saucedemo.com/ using Playwright with Cucumber and Page Object Model.

## User Story Implemented

**As a Sauce Demo customer,**  
**I want to be able to log in, add products to the cart and complete a purchase**  
**To be able to acquire the products I need**

### Acceptance Criteria
1. ✅ The user can log in with valid credentials
2. ✅ The user cannot log in with invalid credentials
3. ✅ The user can add a product to the cart from the products page
4. ✅ The user can see the added products in the shopping cart
5. ✅ The user can complete the purchase process until confirmation

## Project Structure

- `features/` - Cucumber feature files
- `step-definitions/` - Step definitions for Cucumber
- `page-objects/` - Page Object classes
- `playwright.config.js` - Playwright configuration
- `cucumber.js` - Cucumber configuration

## Installation

```bash
npm install
npx playwright install
```

Note: On Linux, you may need to install system dependencies:
```bash
sudo apt-get install libavif13
```

## Running Tests

Run Cucumber tests:
```bash
npm test
```

Run Playwright tests (if using playwright-bdd):
```bash
npm run test:playwright
```

Run tests in headed mode:
```bash
npm run test:headed
```

## Page Objects

- `BasePage.js` - Base class for all page objects
- `LoginPage.js` - Login page object
- `InventoryPage.js` - Inventory page object
- `CartPage.js` - Shopping cart page object
- `CheckoutPage.js` - Checkout page object

## Test Scenarios

The project includes comprehensive test scenarios covering:
- Successful and failed login attempts
- Adding products to cart
- Viewing cart contents
- Completing the checkout process
- Order confirmation