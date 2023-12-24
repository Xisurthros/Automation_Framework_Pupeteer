const LoginPage = require('../src/pages/loginPage');
const HomePage = require('../src/pages/homePage');
const TestUtils = require('../src/utils/testUtils');
const homeData = require('../src/data/homeData');

describe('Home Page UI Component Tests', () => {
    let loginPage, homePage, testUtils;

    beforeAll(async () => {
        testUtils = new TestUtils();
        await testUtils.init();
        loginPage = new LoginPage(testUtils.puppeteerWrapper.page);
        homePage = new HomePage(testUtils.puppeteerWrapper.page);
        await loginPage.navigateTo();
        await loginPage.login('standard_user', 'secret_sauce');
    }, 10000);

    afterAll(async () => {
        await testUtils.close();
    });

    describe('Verify UI Components', () => {
        homeData.uiComponents.forEach(element => {
            test(`verify "${element.name}" (${element.description}) exists`, async () => {
                await homePage.verifyElementExists(element.name, element.selector);
            });
        });
    }, 10000);

    describe('Verify Product List', () => {
        test('verify product list exists', async () => {
            await homePage.verifyElementExists('Product List', '.inventory_list');
        });

        test('verify product list contains 6 products', async () => {
            const products = await homePage.getAllItems();
            expect(products.length).toBe(6);
        });
    });

    // TODO: TargetCloseError: Protocol error (DOM.describeNode): Target closed
    // describe('Verify all products', () => {
    //     const products = [
    //         { name: 'Sauce Labs Backpack', price: '$29.99' },
    //         { name: 'Sauce Labs Bike Light', price: '$9.99' },
    //         { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
    //         { name: 'Sauce Labs Fleece Jacket', price: '$49.99' },
    //         { name: 'Sauce Labs Onesie', price: '$7.99' },
    //         { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99' },
    //     ];

    //     products.forEach(product => {
    //         test(`verify "${product.name}" exists`, async () => {
    //             console.log(`Testing for product: ${product.name}`);
    //             try {
    //                 await homePage.verifyProductExists(product.name);
    //                 console.log(`Product verified: ${product.name}`);
    //             } catch (error) {
    //                 console.error(`Error verifying product ${product.name}:`, error);
    //                 throw error;
    //             }
    //         });
    //     }); 
    // });

});
