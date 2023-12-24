const PuppeteerWrapper = require('./puppeteerWrapper');

class TestUtils {
    constructor() {
        this.puppeteerWrapper = new PuppeteerWrapper();
    }

    async init() {
        await this.puppeteerWrapper.initBrowser({
            headless: false,
            slowMo: 50,
            devtools: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });
    }

    async close() {
        await this.puppeteerWrapper.closeBrowser();
    }

    async getCurrentUrl() {
        return await this.puppeteerWrapper.getCurrentUrl();
    }

}

module.exports = TestUtils;