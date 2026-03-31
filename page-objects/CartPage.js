const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartContainer = '.cart_contents_container';
    this.cartItem = '.cart_item';
    this.checkoutButton = '#checkout';
  }

  async isLoaded() {
    return await this.page.isVisible(this.cartContainer);
  }

  async getCartItems() {
    const items = await this.page.$$eval(this.cartItem, items =>
      items.map(item => item.querySelector('.inventory_item_name').textContent.trim())
    );
    return items;
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

module.exports = CartPage;