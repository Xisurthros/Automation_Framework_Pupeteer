const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page, 'https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.navigateTo();
    if (username) {
      await this.inputText('#user-name', username);
    }
    if (password) {
      await this.inputText('#password', password);
    }
    await this.click('#login-button');
  }

  async verifyLoginErrorMessage(expectedErrorText) {
    const errorMessageSelector = '#login_button_container > div > form > div.error-message-container.error > h3';
  
    try {
      await this.page.waitForSelector(errorMessageSelector, { visible: true, timeout: 5000 });
    } catch (error) {
      throw new Error(`Error message element with selector '${errorMessageSelector}' not found or not visible.`);
    }
  
    const element = await this.page.$(errorMessageSelector);
    
    if (!element) {
      throw new Error(`Error message element with selector '${errorMessageSelector}' not found.`);
    }
  
    const elementText = await this.page.evaluate(element => element.textContent, element);
  
    if (elementText !== expectedErrorText) {
      throw new Error(`Expected: "${expectedErrorText}", Received: "${elementText}"`);
    }
  }

  async userTriesToAccessMainPageWithoutLoggingIn() {
    await this.navigateTo('https://www.saucedemo.com/inventory.html');
  }

  async userTriesToAccessProtectedPageWithoutLoggingIn(pageURL) {
    await this.navigateTo(pageURL);
    await this.page.waitForTimeout(2000);
  }
}

module.exports = LoginPage;