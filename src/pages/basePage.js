class BasePage {
    constructor(page, baseUrl) {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    async navigateTo(url = this.baseUrl) {
        await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }

    async inputText(selector, text) {
        await this.page.type(selector, text);
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async verifyElementExists(elementName, selector) {
        try {
          await this.page.waitForSelector(selector, { visible: true, timeout: 5000 });
        } catch (error) {
          throw new Error(`Element with selector '${selector}' not found or not visible.`);
        }
    }
}

module.exports = BasePage;