const { test, expect } = require('@jest/globals');
const LoginPage = require('../pages/loginPage');
const TestUtils = require('../utils/testUtils');

describe('Login page', () => {
  let loginPage;
  let testUtils;

  beforeAll(async () => {
    testUtils = new TestUtils();
    await testUtils.browserInit();
    await testUtils.pageInit();
    loginPage = new LoginPage(testUtils.page);
  });

  afterAll(async () => {
    await testUtils.closeBrowser();
  });

  test('should display an error message when no username or password are provided', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('a', 'a');
    await loginPage.verifyLoginErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
  
});