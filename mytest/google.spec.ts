import { test, expect } from '@playwright/test';

//const browser = await chromium.launch({ headless: false, channel: 'chrome' });
//const page = await browser.newPage();

test.describe('Google Search Tests', () => {
      test.use({ colorScheme: 'light' });
    test('Homepage should load susccessfully @smoke', async ({ page }) => {

        await page.goto("https://www.google.com/")

        await expect(page).toHaveTitle("Google");
    });

    test('Search box should be visible @regression', async ({ page }) => {

        await page.goto("https://www.google.com/")
        const searchbox = await page.locator("[title='Search']");
        await expect(searchbox).toBeVisible();

    });
    test('should show results after searching keyword @smoke', async ({ page }) => {

        await page.goto("https://www.google.com/")
        const searchbox1 = await page.locator("[title='Search']");
        await searchbox1.fill("playwright");
        await searchbox1.press('Enter');

    });
});