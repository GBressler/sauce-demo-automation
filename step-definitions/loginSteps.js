const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../page-objects/LoginPage');
const ProductPage = require('../page-objects/ProductPage');
const CartPage = require('../page-objects/CartPage');
const CheckoutPage = require('../page-objects/CheckoutPage');


Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  this.productPage = new ProductPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
  await this.page.goto('https://www.saucedemo.com/');
});

// When('I login with username {string} and password {string}', async function (username, password) {
//   await loginPage.login(username, password);
// });

When('I login with valid credentials', async function () {
    const username = process.env.SAUCE_USERNAME1;
    const password = process.env.SAUCE_PASSWORD1;
    await this.loginPage.login(username, password);
});

When('I login with invalid credentials', async function () {
    const username = process.env.SAUCE_USERNAME1;
    const password = process.env.SAUCE_PASSWORD2;
    await this.loginPage.login(username, password);
});

When('I try to login with a locked out user', async function () {
    const username = process.env.SAUCE_USERNAME2;
    const password = process.env.SAUCE_PASSWORD1;
    await this.loginPage.login(username, password);
});

Then('I should see an error message {string}', async function (expectedMessage) {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
});