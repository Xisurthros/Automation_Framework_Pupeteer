const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
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

  async getProductDetails(productName) {
    const elements = await this.getAllItems();
    let product = null;

    for (let element of elements) {
        const name = await element.$eval('.inventory_item_name', (el) => el.innerText);
        if (name === productName) {
            product = element;
            break;
        }
    }

    if (!product) {
        throw new Error(`Product with name "${productName}" not found.`);
    }

    const price = await product.$eval('.inventory_item_price', (el) => el.innerText);
    const description = await product.$eval('.inventory_item_desc', (el) => el.innerText);

    return {
        name: productName,
        price,
        description
    };
  }
  
  async sortItems(sortType) {
    let drop_down_data = {
      'Name (A to Z)': 'az',
      'Name (Z to A)': 'za',
      'Price (low to high)': 'lohi',
      'Price (high to low)': 'hilo'
    }
  
    await this.page.click('.product_sort_container');
    await this.page.select('.product_sort_container', drop_down_data[sortType]);
  }

  async isSorted(array, descending = false) {
    let isSorted = true;
    for (let i = 0; i < array.length - 1; i++) {
        if (descending) {
            if (array[i] < array[i + 1]) {
                isSorted = false;
                break;
            }
        } else {
            if (array[i] > array[i + 1]) {
                isSorted = false;
                break;
            }
        }
    }
    return isSorted;
  }
}

module.exports = HomePage;