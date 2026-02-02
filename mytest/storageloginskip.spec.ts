import { test, expect } from '@playwright/test';


test('storage login test', async ({ page }) => {

    // Login directly to dashboard application
    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/account");

    await page.waitForTimeout(5000);





})