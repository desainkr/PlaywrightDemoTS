import { test, devices, chromium } from '@playwright/test';

test('Mobile UI test without geolocation', async ({ browser }) => {
  const broser= await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 15 Pro Max']
  });

  const page = await context.newPage();
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
          await page.locator("#input-email").fill("pwtest@gmail.com");
          await page.locator("#input-password").fill("playwright@77");
          await page.locator("input[value='Login']").click();
          //console.log(Object.keys(devices));
  //console.log(devices['Pixel 5']);
});