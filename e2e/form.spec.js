import puppetteer from 'puppeteer';
import moment from 'moment';

jest.setTimeout(20000);

describe('TESTS: form date', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'https://shustrila.github.io/AHJ.5.2.trip_calendar/';

    beforeAll(async () => {
        browser = await puppetteer.launch({
            headless: false,
            slowMo: 100,
            devtools: true,
        });
        page = await browser.newPage();
    });

    test('1. validate form', async () => {
        await page.goto(baseUrl);
        await page.click('.form__submit');

        await page.$(".form form__label", async item => {
            await item.waitForSelector('.error');
        });
    });


    test('1. error form', async () => {
        await page.goto(baseUrl);
        const widget = await page.$('[data-widget="date-form"]');
        await widget.click('[name="date-there"]');
        const dateThere = await moment().add(1, 'd').format('DD');
        await widget.click(`.form__label-there .calendar [data-day="${dateThere}"]`);
        await widget.click('[name="date-black"]');
        const dateBack = await moment().add(2, 'd').format('DD');
        await widget.click(`.form__label-black .calendar [data-day="${dateBack}"]`);
        page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await widget.click('.form__submit');
    });

    afterAll(async () => {
        await browser.close();
    });
});
