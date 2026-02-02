import { test, expect} from "@playwright/test";
import path from 'path';
import data from '../testdata/login.json' with { type: 'json' };

test('env login test', async ({ page }) => {
    console.log("URL is :", data.baseURL);
    console.log('username and password is:',data.user,':', data.password);
    await page.goto(data.baseURL);
    await page.getByPlaceholder("Username").fill(data.user);
    await page.getByPlaceholder("Password").fill(data.password);
    await page.getByRole("button", { name: 'Login' }).click();
    //await page.waitForTimeout(3000);
    //await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({timeout: 3000});

})