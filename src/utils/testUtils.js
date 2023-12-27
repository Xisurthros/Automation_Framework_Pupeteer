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

    async captureScreenshot(selector, path) {
        // if (selector !== '') {
            // then outline the element, capture a screenshots and remove the ouline
            // otherwise just capture a screenshot
        if (selector !== '') {
            await this.puppeteerWrapper.page.evaluate((selector) => {
                document.querySelector(selector).style.outline = 'solid red';
            }, selector);
        }
        await this.puppeteerWrapper.page.screenshot({ path, fullPage: true });
        if (selector !== '') {
            await this.removeOutline(selector);
        }
    }

    async removeOutline(selector) {
        await this.puppeteerWrapper.page.evaluate((selector) => {
            document.querySelector(selector).style.outline = '';
        }, selector);
    }
}

module.exports = TestUtils;