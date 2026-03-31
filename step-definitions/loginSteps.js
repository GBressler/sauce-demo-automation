const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../page-objects/LoginPage');
const InventoryPage = require('../page-objects/InventoryPage');
const CartPage = require('../page-objects/CartPage');
const CheckoutPage = require('../page-objects/CheckoutPage');

let loginPage;
let inventoryPage;
let cartPage;
let checkoutPage;

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  inventoryPage = new InventoryPage(this.page);
  cartPage = new CartPage(this.page);
  checkoutPage = new CheckoutPage(this.page);
  await this.page.goto('https://www.saucedemo.com/');
});

When('I login with username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

Then('I should be on the inventory page', async function () {
  const isLoaded = await inventoryPage.isLoaded();
  expect(isLoaded).toBe(true);
});

Then('I should see an error message {string}', async function (expectedMessage) {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
});

When('I add {string} to the cart', async function (itemName) {
  await inventoryPage.addItemToCart(itemName);
});

Then('I should see {int} item in the cart badge', async function (expectedCount) {
  const badgeCount = await inventoryPage.getCartBadgeCount();
  expect(badgeCount).toBe(expectedCount);
});

When('I click on the cart icon', async function () {
  await inventoryPage.clickCartIcon();
});

Then('I should see the cart page with {string}', async function (itemName) {
  const isLoaded = await cartPage.isLoaded();
  expect(isLoaded).toBe(true);
  const cartItems = await cartPage.getCartItems();
  expect(cartItems).toContain(itemName);
});

When('I proceed to checkout', async function () {
  await cartPage.proceedToCheckout();
});

When('I fill checkout information with {string} {string} {string}', async function (firstName, lastName, postalCode) {
  await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
});

When('I complete the purchase', async function () {
  await checkoutPage.completePurchase();
});

Then('I should see the order confirmation', async function () {
  const isConfirmed = await checkoutPage.isOrderConfirmed();
  expect(isConfirmed).toBe(true);
});