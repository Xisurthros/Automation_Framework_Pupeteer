const puppeteer = require('puppeteer');

class TestUtils {

  constructor() {
    this.browser = null;
    this.page = null;
  }
  
  async browserInit() {
    this.browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: false,
      defaultViewport: null,
      args: ['--start-maximized']
    });
  }

  async pageInit() {
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async verifyElementText(selector, expectedText) {
    // sleep
    await this.page.waitForTimeout(3000);
    const element = await this.page.$(selector);
    const elementText = await this.page.evaluate(element => element.textContent, element);
    expect(elementText).toBe(expectedText);
  }

}

module.exports = TestUtils;