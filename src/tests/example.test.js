const { test, expect } = require('@jest/globals');
const LoginPage = require('../pages/loginPage');
const TestUtils = require('../utils/testUtils');

// Define a list of protected page URL paths
const protectedPageURLs = [
    '/inventory.html',
    '/inventory-item.html?id=0',
    '/inventory-item.html?id=1',
    '/inventory-item.html?id=2',
    '/inventory-item.html?id=3',
    '/inventory-item.html?id=4',
    '/inventory-item.html?id=5',
    '/cart.html',
    '/checkout-step-one.html',
    '/checkout-step-two.html',
    '/checkout-complete.html',
].map((page) => `https://www.saucedemo.com${page}`);

// Helper function to format the page URL
function formatPageURL(pageURL) {
    const baseURL = 'https://www.saucedemo.com';
    const pathPart = new URL(url).pathname;
    return pathPart.replace(baseURL, '');
}

// Test suite for the login page
describe('Login Page', () => {
    let loginPage;
    let testUtils;

    // Set up before each test case
    beforeEach(async () => {
        testUtils = new TestUtils();
        await testUtils.browserInit();
        await testUtils.pageInit();
        loginPage = new LoginPage(testUtils.page);
        await loginPage.navigateToLoginPage();
    });

    // Tear down after each test case
    afterEach(async () => {
        await testUtils.closeBrowser();
    });

    // Test suite for unauthorized access to protected pages
    describe('Unauthorized Access to Protected Pages', () => {
        // Test for unauthorized access to protected pages without logging in
        test.each(protectedPageURLs)(
            'should redirect to login page with an error message when attempting unauthorized access to %s',
            async (pageURL) => {
                const pathPart = formatPageURL(pageURL);

                // Simulate an attempt to access the protected page without logging in
                await loginPage.userTriesToAccessProtectedPageWithoutLoggingIn(pageURL);

                // Verify that the user is redirected to the login page
                const currentUrl = await testUtils.getCurrentUrl();
                expect(currentUrl).toBe('https://www.saucedemo.com/');

                // Verify the displayed error message with the path part
                const errorMessage = `Epic sadface: You can only access '${pathPart}' when you are logged in.`;
                await loginPage.verifyLoginErrorMessage(errorMessage);
            }
        );
    });
});
