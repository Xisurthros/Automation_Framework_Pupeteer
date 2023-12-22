class HomePage {
    constructor(page) {
      this.page = page;
      this.base_url = 'https://www.saucedemo.com/';
    }
  
    async getTitle() {
        return await this.page.title();
    }
  
    async verifyUserUsOnInventoryPage() {
        const element = await this.page.$('#inventory_filter_container > div');
        expect(element).not.toBeNull();
    }

    async verifyAllItemsAreDisplayed() {
        const element = await this.page.$('#inventory_container > div.inventory_list > div:nth-child(1) > div.inventory_item_name');
        expect(element).not.toBeNull();
    }
    
    async getAllItems() {
        const elements = await this.page.$$('#inventory_container > div.inventory_list > div');
        return elements;
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
  
}
  
module.exports = HomePage;
  