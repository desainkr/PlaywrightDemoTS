import { test, expect, devices } from '@playwright/test';

test('retry logic improved', async ({ browser }) => {

  let attempts = 0;
  const maxAttempts = 3;
/*
We create new context and page for each retry to ensure:
Clean browser state for every attempt
What is context and page?
🔹 browser context
Like a fresh browser profile
No cookies, no session, no cache
🔹 page
A tab inside that context
Why we use context in retry
const context = await browser.newContext();
const page = await context.newPage();

👉 Every attempt gets:

fresh cookies 🍪
fresh session 🔐
no previous state
*/
  while (attempts < maxAttempts) {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      console.log(`Attempt: ${attempts + 1}`);

      await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

      await page.fill('#input-email', 'pwtest@gmail.com');
      await page.fill('#input-password', 'playwright@77');
      await page.click("input[value='Login']");

      await expect(page.locator('h2')).toHaveText('My Account');

      console.log('Success!');
      await context.close();
      break; // exit loop if success

    } catch (error) {
      console.log(`Failed attempt: ${attempts + 1}`);
      attempts++;

      await context.close();

      if (attempts === maxAttempts) throw error;
    }
    /*
    Why Playwright retries are better
      Playwright internally does:
      New context + new page per retry
     👉 That’s why built-in retries are reliable
    */
  }
});
