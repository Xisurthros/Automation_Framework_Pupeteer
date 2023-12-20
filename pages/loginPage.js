class LoginPage {
  constructor(page) {
    this.page = page;
    this.base_url = 'https://www.saucedemo.com/';
  }

  async getTitle() {
    return await this.page.title();
  }

  async navigateToLoginPage() {
    await this.page.goto(this.base_url);
  }

  async login(username, password) {
    if (username !== '') {
      await this.page.type('#user-name', username);
    }
    if (password !== '') {
      await this.page.type('#password', password);
    }
    await this.page.click('#login-button');
  }

  async verifyErrorMessage(expectedErrorText) {
    await this.page.waitForSelector('#login_button_container > div > form > div.error-message-container.error > h3');
    const element = await this.page.$('#login_button_container > div > form > div.error-message-container.error > h3');
    const elementText = await this.page.evaluate(element => element.textContent, element);
    expect(elementText).toBe(expectedErrorText);
  }

}

module.exports = LoginPage;
