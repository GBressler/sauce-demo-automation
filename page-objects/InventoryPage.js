const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryContainer = '.inventory_container';
    this.addToCartButton = '.btn_inventory';
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
  }

  async isLoaded() {
    return await this.page.isVisible(this.inventoryContainer);
  }

  async addItemToCart(itemName) {
    const itemSelector = `.inventory_item:has-text("${itemName}") ${this.addToCartButton}`;
    await this.page.click(itemSelector);
  }

  async getCartBadgeCount() {
    const badge = await this.page.textContent(this.cartBadge);
    return parseInt(badge) || 0;
  }

  async clickCartIcon() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = InventoryPage;