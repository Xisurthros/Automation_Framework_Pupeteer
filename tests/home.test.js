const LoginPage = require('../src/pages/loginPage');
const HomePage = require('../src/pages/homePage');
const TestUtils = require('../src/utils/testUtils');
const homeData = require('../src/data/homeData');

/*
  Test Suite for Home Page UI Components
  
  This suite covers tests for verifying the existence and correctness of UI components
  on the home page, including general UI elements and product listings.
 */
describe('Home Page UI Component Tests', () => {
    let loginPage, homePage, testUtils;

    // Set up before all tests
    beforeAll(async () => {
        testUtils = new TestUtils();
        await testUtils.init();
        loginPage = new LoginPage(testUtils.page);
        homePage = new HomePage(testUtils.page);
        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'secret_sauce');
    }, 10000);

    // Tear down after all tests
    afterAll(async () => {
        await testUtils.closeBrowser();
    });

    // Test suite for verifying individual UI components
    describe('Verify UI Components', () => {
        homeData.uiComponents.forEach(({ name, description, selector }) => {
            test(`verify "${name}" (${description}) exists`, async () => {
                await homePage.verifyElementExists(name, selector);
                await testUtils.captureScreenshot(selector, `./screenshots/home/elements_exist/${name}.png`);
                // Remove the outline so it is no carried over to the next test
                await testUtils.removeOutline(selector);
            });
        });

        // Test for Product List Existence
        test('Product list exists', async () => {
            await homePage.verifyElementExists('Product List', '.inventory_list');
        });

        // Test for Correct Number of Products
        test('Product list contains 6 products', async () => {
            const products = await homePage.getAllItems();
            expect(products.length).toBe(6);
        });

    }, 10000);

    // Test suite for verifying product sorting
    describe('Verify Product Sorting', () => {
        const sortTypes = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];

        sortTypes.forEach((sortType) => {
            test(`verify product sorting by "${sortType}"`, async () => {
                await homePage.sortItems(sortType);
                const products = await homePage.getAllItems();

                const productNames = await Promise.all(products.map(async (product) => {
                    return await product.$eval('.inventory_item_name', (el) => el.innerText);
                }));

                const productPrices = await Promise.all(products.map(async (product) => {
                    return parseFloat(await product.$eval('.inventory_item_price', (el) => el.innerText.replace('$', '')));
                }));

                if (sortType === 'Name (A to Z)' || sortType === 'Name (Z to A)') {
                    let isSortedCorrectly = homePage.isSorted(productNames, sortType === 'Name (Z to A)');
                    expect(isSortedCorrectly).toBeTruthy();
                } else if (sortType.includes('Price')) {
                    let isSortedCorrectly = homePage.isSorted(productPrices, sortType === 'Price (high to low)');
                    expect(isSortedCorrectly).toBeTruthy();
                }
                await testUtils.captureScreenshot('', `./screenshots/home/sorted/${sortType}.png`);
            });
        });
    });
});
