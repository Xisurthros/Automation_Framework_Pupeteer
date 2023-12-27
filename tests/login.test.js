const { test, expect } = require('@jest/globals');
const LoginPage = require('../src/pages/loginPage');
const TestUtils = require('../src/utils/testUtils');
const loginData = require('../src/data/loginData');

/*
  Test Suite for Login Page Functionality

  This suite covers tests related to the essential elements on the login page,
  successful login, handling of invalid login attempts, and unauthorized access
  to protected pages.
 */
describe('Login Page Tests', () => {
  let loginPage, testUtils;

  // Set up before each test
  beforeAll(async () => {
    testUtils = new TestUtils();
    await testUtils.init();
    loginPage = new LoginPage(testUtils.page);
    await loginPage.navigateTo();
  });

  // Tear down after each test
  afterAll(async () => {
    await testUtils.closeBrowser();
  });

  // Test suite for verifying the existence of essential elements
  describe('Element Existence', () => {
    loginData.essentialElements.forEach(({ element, selector }) => {
      test(`displays ${element}`, async () => {
        await loginPage.verifyElementExists(element, selector);
        // outline the element in the browser to visually confirm it's the correct one and screenshot
        await loginPage.captureScreenshot(selector, `./screenshots/login/elements_exist/${element}-exists.png`);
      });
    });
  });

  // Test suite for invalid login attempts
  describe('Invalid Login', () => {
    loginData.invalidCredentials.forEach(({ username, password, errorMessage }) => {
      test(`displays error for invalid credentials: ${username}, ${password}`, async () => {
        await loginPage.login(username, password);
        await loginPage.verifyLoginErrorMessage(errorMessage);
        await loginPage.captureScreenshot('.error-message-container.error h3', `./screenshots/login/login_attempt/invalid-login-${username}-${password}.png`)
      }, 15000);
    });
  });
  
  // Test suite for unauthorized access
  describe('Unauthorized Access', () => {
    loginData.protectedPages.forEach(page => { // Iterate over the protectedPages array
      const { url, imageID } = page; // Destructure the page object
      test(`redirects to login page from ${url} when not logged in`, async () => {
        await loginPage.userTriesToAccessProtectedPageWithoutLoggingIn(url);
        expect(await loginPage.getCurrentUrl()).toBe('https://www.saucedemo.com/');
        const errorMessage = `Epic sadface: You can only access '${new URL(url).pathname}' when you are logged in.`;
        await loginPage.verifyLoginErrorMessage(errorMessage);
        await loginPage.captureScreenshot('.error-message-container.error h3', `./screenshots/login/unauthorized_access/${imageID}-invalid-login.png`);
      });
    });
  });

  // Test suite for successful login
  describe('Successful Login', () => {
    test('logs in with valid credentials', async () => {
      await loginPage.login(loginData.validCredentials.username, loginData.validCredentials.password);
      expect(await loginPage.getCurrentUrl()).toBe('https://www.saucedemo.com/inventory.html');
      await loginPage.captureScreenshot('', './screenshots/login/login_attempt/successful-login.png');
    }, 10000);
  });
});
