const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartContainer = '.cart_contents_container';
    this.cartItem = '.cart_item';
    this.cartItemName = '.inventory_item_name'; 
    this.checkoutButton = '#checkout';
  }

  async isLoaded() {
    return await this.page.isVisible(this.cartContainer);
  }

  async getCartItems() {
  const itemElements = await this.page.locator(`${this.cartItem} ${this.cartItemName}`).all();
  return Promise.all(itemElements.map(item => item.textContent()));

  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

module.exports = CartPage;