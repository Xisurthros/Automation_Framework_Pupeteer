const { test, expect } = require('@jest/globals');
const LoginPage = require('../pages/loginPage');
const TestUtils = require('../utils/testUtils');

// Test data
const testData = {
  validCredentials: { username: 'standard_user', password: 'secret_sauce' },
  invalidCredentials: [
    { username: '', password: '', errorMessage: 'Epic sadface: Username is required' },
    { username: 'standard_user', password: '', errorMessage: 'Epic sadface: Password is required' },
    { username: 'invalid_username', password: 'secret_sauce', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
    { username: 'standard_user', password: 'invalid_password', errorMessage: 'Epic sadface: Username and password do not match any user in this service' },
  ],
  protectedPages: [
    '/inventory.html',
    '/cart.html',
    '/checkout-step-one.html',
    '/checkout-step-two.html',
    '/checkout-complete.html',
    ...Array.from({ length: 6 }, (_, i) => `/inventory-item.html?id=${i}`),
  ].map(page => `https://www.saucedemo.com${page}`),
};

// Initialize test suite
describe('Login Page Tests', () => {
  let loginPage, testUtils;

  beforeEach(async () => {
    testUtils = new TestUtils();
    await testUtils.initBrowser();
    await testUtils.initPage();
    loginPage = new LoginPage(testUtils.page);
    await loginPage.navigateTo();
  });

  afterEach(async () => {
    await testUtils.closeBrowser();
  });

  // Test for successful login
  describe('Successful Login', () => {
    test('logs in with valid credentials', async () => {
      await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
      expect(await testUtils.getCurrentUrl()).toBe('https://www.saucedemo.com/inventory.html');
    });
  });

  // Test for unsuccessful login attempts
  describe('Unsuccessful Login', () => {
    test.each(testData.invalidCredentials)(
      'displays error for invalid credentials',
      async ({ username, password, errorMessage }) => {
        await loginPage.login(username, password);
        await loginPage.verifyLoginErrorMessage(errorMessage);
      }
    );
  });

  // Test for unauthorized access to protected pages
  describe('Unauthorized Access', () => {
    test.each(testData.protectedPages)(
      'redirects to login page from %s when not logged in',
      async (pageURL) => {
        await loginPage.userTriesToAccessProtectedPageWithoutLoggingIn(pageURL);
        expect(await testUtils.getCurrentUrl()).toBe('https://www.saucedemo.com/');
        const errorMessage = `Epic sadface: You can only access '${new URL(pageURL).pathname}' when you are logged in.`;
        await loginPage.verifyLoginErrorMessage(errorMessage);
      }
    );
  });
});
