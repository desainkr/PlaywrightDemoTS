import { test, expect} from "@playwright/test";
import path from 'path';
import datas from '../testdata/dd.json' with { type: 'json' };
console.log(datas);

for (const data of datas) {
    
test(`env login test ${data.email}`, async ({ page }) => {
    console.log("URL is :", data.baseURL);
    console.log('username and password is:',data.email,':', data.password);
    await page.goto(data.baseURL);
    await page.getByPlaceholder("E-Mail Address").fill(data.email);
    await page.getByPlaceholder("Password").fill(data.password);
    await page.getByRole("button", { name: 'Login' }).click();
    //await page.waitForTimeout(3000);
    //await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: 'My Account' }).first()).toBeVisible({timeout: 5000});
    //await expect(page.locator("//h2[normalize-space()='My Account']")).toBeVisible({timeout: 3000});
})
}