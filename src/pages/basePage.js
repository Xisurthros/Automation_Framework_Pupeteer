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

    async verifyElement(selector) {
        const element = await this.page.$(selector);
        return element !== null;
    }

    async inputText(selector, text) {
        await this.page.type(selector, text);
    }

    async click(selector) {
        await this.page.click(selector);
    }
}

module.exports = BasePage;