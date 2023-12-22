const { test, expect } = require('@jest/globals');
const LoginPage = require('../pages/loginPage');
const TestUtils = require('../utils/testUtils');

describe('Login page', () => {
  let loginPage;
  let testUtils;

  beforeEach(async () => {
    testUtils = new TestUtils();
    await testUtils.browserInit();
    await testUtils.pageInit();
    loginPage = new LoginPage(testUtils.page);
  });

  afterEach(async () => {
    await testUtils.closeBrowser();
  });

  test('should display an error message when no username or password are provided', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('', '');
    await loginPage.verifyLoginErrorMessage('Epic sadface: Username is required');
  });

  test('should display an error message when no username is provided', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('', 'secret_sauce');
    await loginPage.verifyLoginErrorMessage('Epic sadface: Username is required');
  });

  test('should display an error message when no password is provided', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', '');
    await loginPage.verifyLoginErrorMessage('Epic sadface: Password is required');
  });

  test('should display an error message when an invalid username is provided', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('invalid_username', 'secret_sauce');
    await loginPage.verifyLoginErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('should display an error message when an invalid password is provided', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'invalid_password');
    await loginPage.verifyLoginErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });
  
  test('should direct users back to the login page when the try to access the main page without logging in', async () => {
    await loginPage.navigateToLoginPage();
    await loginPage.userTriesToAccessMainPageWithoutLoggingIn();
    await loginPage.verifyLoginErrorMessage('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
  });

});