class LoginPage {
  constructor(page) {
    this.page = page;
    this.base_url = 'https://www.saucedemo.com/';
  }

  async getTitle() {
    return await this.page.title();
  }

  async verifyLoginPage() {
    const element = await this.page.$('#login_button_container > div > form > div.login_logo');
    expect(element).not.toBeNull();
  }

  async navigateToLoginPage() {
    await this.page.goto(this.base_url);
  }

  async input_username(username) {
    await this.page.type('#user-name', username);
  }

  async input_password(password) {
    await this.page.type('#password', password);
  }

  async click_login_button() {
    await this.page.click('#login-button');
  }

  async login(username, password) {
    if (username !== '') {
      await this.input_username(username);
    }
    if (password !== '') {
      await this.input_password(password);
    }
    await this.click_login_button();
  }

  async verifyLoginErrorMessage(expectedErrorText) {
    await this.page.waitForSelector('#login_button_container > div > form > div.error-message-container.error > h3');
    const element = await this.page.$('#login_button_container > div > form > div.error-message-container.error > h3');
    const elementText = await this.page.evaluate(element => element.textContent, element);
    expect(elementText).toBe(expectedErrorText);
  }

  async userTriesToAccessMainPageWithoutLoggingIn() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

}

module.exports = LoginPage;
