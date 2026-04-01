const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CheckoutPage = require('../page-objects/CheckoutPage');


When('I fill checkout information with {string} {string} {string}', async function (firstName, lastName, postalCode) {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
});

When('I click the continue button', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.clickContinue();
});

When('I click the finish button', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.clickFinish();
});

Then('I should see the order confirmation', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  const isConfirmed = await this.checkoutPage.isOrderConfirmed();
  expect(isConfirmed).toBe(true);
});