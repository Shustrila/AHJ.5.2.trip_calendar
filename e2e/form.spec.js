import puppetteer from 'puppeteer';

jest.setTimeout(20000);

describe('TESTS: form date', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'https://shustrila.github.io/AHJ.5.3.list_editor/';

    beforeAll(async () => {
        browser = await puppetteer.launch({
            headless: false,
            slowMo: 100,
            devtools: true,
        });
        page = await browser.newPage();
    });

    test('1. error form', async () => {

    });

    afterAll(async () => {
        await browser.close();
    });
});
