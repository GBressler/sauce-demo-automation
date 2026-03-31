const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutContainer = '.checkout_info_container';
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.confirmationContainer = '.checkout_complete_container';
  }

  async isLoaded() {
    return await this.page.isVisible(this.checkoutContainer);
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async completePurchase() {
    await this.page.click(this.finishButton);
  }

  async isOrderConfirmed() {
    return await this.page.isVisible(this.confirmationContainer);
  }
}

module.exports = CheckoutPage;