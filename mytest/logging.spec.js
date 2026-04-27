import { test } from '@playwright/test';

test('Test console, pageerror, and automation error', async ({ page }) => {

  page.on('console', msg => console.log("Console:", msg.text()));
  page.on('pageerror', err => console.log("Page Error:", err.message));

  await page.goto('https://example.com');

  // ✅ Console log
  await page.evaluate(() => {
    console.log("This is a browser console log");
  });

  // ✅ Page error (handled)
  try {
    await page.evaluate(() => {
      throw new Error("This is a JS runtime error");
    });
  } catch (e) {
    console.log("Caught Evaluate Error:", e.message);
  }

  // ✅ Automation error
  try {
    await page.locator('#invalid-id').click();
  } catch (e) {
    console.log("Automation Error:", e.message);
  }

});