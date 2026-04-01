const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.ProductsContainer = '.inventory_container';
    this.addToCartButton = '.btn_inventory';
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
  }

  async isLoaded() {
    return await this.page.isVisible(this.ProductsContainer);
  }

  async addItemToCart(itemName) {
    const id = itemName.toLowerCase().split(' ').join('-');
    await this.page.click(`[data-test="add-to-cart-${id}"]`);
  }

  async getCartBadgeCount() {
    const badge = await this.page.textContent(this.cartBadge);
    return parseInt(badge) || 0;
  }

  async clickCartIcon() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = ProductPage;