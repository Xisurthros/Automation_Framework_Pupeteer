const puppeteer = require('puppeteer');

class PuppeteerWrapper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async initBrowser(options = {}) {
        this.browser = await puppeteer.launch(options);
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
        if (this.browser) {
            await this.browser.close();
        }
    }

    async getCurrentUrl() {
        return await this.page.url();
    }
    
}

module.exports = PuppeteerWrapper;