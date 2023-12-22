const puppeteer = require('puppeteer');

class TestUtils {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode in production
      slowMo: 50, // Adjust the slow motion speed
      devtools: false, // Enable or disable DevTools
      defaultViewport: null, // Set a custom viewport if needed
      args: ['--start-maximized'], // Additional command-line arguments
    });
  }

  async initPage() {
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async waitForSelector(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
    } catch (error) {
      throw new Error(`Element with selector '${selector}' not found within the specified timeout.`);
    }
  }

  async getElementText(selector) {
    await this.waitForSelector(selector);
    const element = await this.page.$(selector);
    return await this.page.evaluate(element => element.textContent, element);
  }

  async verifyElementText(selector, expectedText) {
    const elementText = await this.getElementText(selector);
    expect(elementText).toBe(expectedText);
  }

  async getCurrentUrl() {
    return await this.page.url();
  }
}

module.exports = TestUtils;