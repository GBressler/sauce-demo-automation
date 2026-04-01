const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CartPage = require('../page-objects/CartPage');


When('I proceed to checkout', async function () {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.proceedToCheckout();
});

Then('I should see the cart page with {string}', async function (itemName) {
  this.cartPage = new CartPage(this.page);
  await expect(this.page.locator('.title')).toHaveText('Your Cart');
  const cartItems = await this.cartPage.getCartItems();
  expect(cartItems).toContain(itemName);
});