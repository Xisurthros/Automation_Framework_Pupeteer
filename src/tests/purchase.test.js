// const { test, expect } = require('@jest/globals');
// const LoginPage = require('../pages/loginPage');
// const HomePage = require('../pages/homePage');
// const TestUtils = require('../utils/testUtils');

// describe('Purchase regression - ', () => {
//     let loginPage;
//     let homePage;
//     let testUtils;

//     beforeAll(async () => {
//         testUtils = new TestUtils();
//         await testUtils.browserInit();
//         await testUtils.pageInit();
//         loginPage = new LoginPage(testUtils.page);
//         homePage = new HomePage(testUtils.page);
//     });

//     afterAll(async () => {
//         await testUtils.closeBrowser();
//     });

//     test('user should be able to login', async () => {
//         await loginPage.navigateToLoginPage();
//         await loginPage.login("standard_user", "secret_sauce");
//     });

//     test('user should be able to add items to cart', async () => {
//         await homePage.addRandomItemsToCart();
//     });

// });