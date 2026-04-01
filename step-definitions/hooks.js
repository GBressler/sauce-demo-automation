require('dotenv').config();
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(60 * 1000);

let browser;
let page;

Before(async function () {
  browser = await chromium.launch({ headless: false, slowMo: 1000, args: ['--start-maximized'] });
  page = await browser.newPage({ viewport: null });
  this.page = page;
});

After(async function () {
  if (page) await page.close();
  if (browser) await browser.close();
});