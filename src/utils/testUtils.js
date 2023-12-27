const puppeteer = require('puppeteer');

class TestUtils {
    constructor() {
        this.browser = null;
        this.page = null;
        this.browser_options = {
            headless: false,
            slowMo: 50,
            devtools: false,
            defaultViewport: null,
            args: ['--start-maximized']
        };
    }

    async init() {
        this.browser = await puppeteer.launch(this.browser_options);
        this.page = await this.browser.newPage();
        this.setupGlobalNetworkErrorListener();
    }

    setupGlobalNetworkErrorListener() {
        this.page.on('response', (response) => {
            if (!response.ok()) {
                global.networkErrorDetected = true;
            }
        });
    }

    async closeBrowser() {
        await this.browser.close();
    }
}

module.exports = TestUtils;