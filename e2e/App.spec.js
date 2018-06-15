import puppeteer from "puppeteer";

const app = "http://localhost:3000";

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 80,
        args: [`--window-size=${width},${height}`, '--no-sandbox', '--disable-setuid-sandbox', '--enable-logging', '--v=1']
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});

describe("App", () => {
    beforeEach(async () => {
        await page.goto(app);
        await page.waitForSelector(".App-title");
    }, 16000);

    test("should display specific element", async () => {
        const buttonText = await page.$eval(".App-title", el => el.textContent);
        expect(buttonText).toEqual("Welecome to React");
    });
});
