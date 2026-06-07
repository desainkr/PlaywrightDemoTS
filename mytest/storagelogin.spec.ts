import { test, expect } from '@playwright/test';
test('storage login test', async ({ page }) => {

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/login");
    // Login to application
    await page.getByPlaceholder("E-Mail Address").fill("neel@gmail.com");
    await page.getByPlaceholder("Password").fill("Test@123");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'My Account', level: 2 })).toBeVisible();
    await page.waitForTimeout(2000)
    //save storage state  
    await page.context().storageState({ path: 'testdata/authentication.json' });

    //https://tutorialsninja.com/demo/index.php?route=account/account



})

