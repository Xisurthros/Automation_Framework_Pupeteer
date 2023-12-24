const { test, expect } = require('@jest/globals');
const LoginPage = require('../src/pages/loginPage');
const TestUtils = require('../src/utils/testUtils');
const loginData = require('../src/data/loginData');

// Initialize test suite
describe('Login Page Tests', () => {
  let loginPage, testUtils;

  beforeEach(async () => {
    testUtils = new TestUtils();
    await testUtils.init();
    loginPage = new LoginPage(testUtils.puppeteerWrapper.page);
    await loginPage.navigateTo();
  });

  afterEach(async () => {
    await testUtils.close();
  });

  // Test all essential elements are present
  describe('Element Existence', () => {
    const essentialElements = [
      { element: 'logo', selector: '.login_logo'},
      { element: 'username field', selector: '#user-name' },
      { element: 'password field', selector: '#password' },
      { element: 'login button', selector: '#login-button' },
    ];

    essentialElements.forEach(({ element, selector }) => {
      test(`displays ${element}`, async () => {
        await loginPage.verifyElementExists(element, selector);
      });
    });
  });

  // Test for successful login
  describe('Successful Login', () => {
    test('logs in with valid credentials', async () => {
      await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
      expect(await testUtils.getCurrentUrl()).toBe('https://www.saucedemo.com/inventory.html');
    }, 10000);
  });

  // Test for invalid login attempts
  describe('Invalid Login', () => {
    loginData.invalidCredentials.forEach(({ username, password, errorMessage }) => {
      test(`displays error for invalid credentials: ${username}, ${password}`, async () => {
        await loginPage.login(username, password);
        await loginPage.verifyLoginErrorMessage(errorMessage);
      }, 15000);
    });
  });
  
  // Test for unauthorized access to protected pages
  describe('Unauthorized Access', () => {
    loginData.protectedPages.forEach(pageURL => {
      test(`redirects to login page from ${pageURL} when not logged in`, async () => {
        await loginPage.userTriesToAccessProtectedPageWithoutLoggingIn(pageURL);
        expect(await testUtils.getCurrentUrl()).toBe('https://www.saucedemo.com/');
        const errorMessage = `Epic sadface: You can only access '${new URL(pageURL).pathname}' when you are logged in.`;
        await loginPage.verifyLoginErrorMessage(errorMessage);
      });
    });
  });
});
