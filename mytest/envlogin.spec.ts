import { test, expect} from "@playwright/test";
import path from 'path';
const baseURL = process.env.baseURL as string;
const username = process.env.user as string;
const password = process.env.password as string;
c

test('env login test', async ({ page }) => {
    console.log("URL is :", baseURL);
    console.log('username and password is:',username,':', password);
    await page.goto(baseURL);
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: 'Login' }).click();
    //await page.waitForTimeout(3000);
    //await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({timeout: 3000});

})