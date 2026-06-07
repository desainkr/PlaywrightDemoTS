import { chromium, test } from '@playwright/test';

test('Launch maximize browser window', async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  // Use ONLY viewport:null here
  // Do not pass deviceScaleFactor at all
  const context = await browser.newContext({
    viewport: null
  });

  const page = await context.newPage();
  await page.goto('https://automationexercise.com/');
  await page.waitForTimeout(3000);
  await browser.close();
});