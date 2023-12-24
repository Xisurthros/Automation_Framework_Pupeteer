const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page, 'https://www.saucedemo.com/');
  }

  async getAllItems() {
    return await this.page.$$('.inventory_item');
  }

  async clickCartButton() {
    await this.page.click('#shopping_cart_container > a > svg');
  }

  async addRandomItemsToCart() {
    const elements = await this.getAllItems();
    const randomIndex = Math.floor(Math.random() * elements.length);
    const randomItem = elements[randomIndex];
    const addToCartButton = await randomItem.$('button.btn_primary.btn_inventory');
    await addToCartButton.click();
  }

  async verifyProductExists(productName) {
    const elements = await this.getAllItems();
    const product = elements.find(async (element) => {
      const name = await element.$eval('.inventory_item_name', (el) => el.innerText);
      return name === productName;
    });
    expect(product).toBeDefined();
  }

}

module.exports = HomePage;