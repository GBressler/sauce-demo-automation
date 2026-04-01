const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ProductPage = require('../page-objects/ProductPage');


When('I add {string} to the cart', async function (itemName) {
  this.productPage = new ProductPage(this.page);
  await this.productPage.addItemToCart(itemName);
});

Then('I should be on the Products page', async function () {
await expect(this.page.locator('.title')).toHaveText('Products');
});

Then('I should see {int} item in the cart badge', async function (expectedCount) {
  this.productPage = new ProductPage(this.page);
    const badgeCount = await this.productPage.getCartBadgeCount();
  expect(badgeCount).toBe(expectedCount);
});

When('I click on the cart icon', async function () {
  this.productPage = new ProductPage(this.page);
  await this.productPage.clickCartIcon();
});