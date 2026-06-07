import { test, expect} from "@playwright/test";
import path from 'path';
import datas from '../testdata/dd.json' with { type: 'json' };
console.log(datas);

for (const data of datas) {
    
test(`env login test ${data.DD_EMAIL}`, async ({ page }) => {
    console.log("URL is :", data.DD_BASE_URL);
    console.log('username and password is:',data.DD_EMAIL,':', data.DD_PASSWORD);
    await page.goto(data.DD_BASE_URL);
    await page.getByPlaceholder("E-Mail Address").fill(data.DD_EMAIL);
    await page.getByPlaceholder("Password").fill(data.DD_PASSWORD);
    await page.getByRole("button", { name: 'Login' }).click();
  
    //await page.waitForTimeout(3000);
    //await expect(page.getByRole("heading", { name: 'Dashboard' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("heading", { name: 'My Account' }).first()).toBeVisible({timeout: 5000});
    //await expect(page.locator("//h2[normalize-space()='My Account']")).toBeVisible({timeout: 3000});
})
}