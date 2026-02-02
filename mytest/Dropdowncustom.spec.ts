import { test, expect } from "@playwright/test";

test('Customer Drop Down test', async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('.oxd-userdropdown-tab').click();

    await page.getByRole('menuitem', { name: 'Support' }).click();
    //await page.locator('[role="menuitem"]',{hasText:'support'}).click();
    await expect(page.getByText('Customer Support', { exact: true })).toBeVisible();
    await expect(page.getByText('Customer Support', { exact: true })).toHaveText("Customer Support");

    await page.getByText('Leave', { exact: true }).click();
    await page.waitForSelector(".oxd-multiselect-wrapper .oxd-select-text");
    await page.locator(".oxd-multiselect-wrapper .oxd-select-text").click();

    // setTimeout(()=>{debugger;},5000)
    await page.locator(".oxd-select-option", { hasText: 'Cancelled' }).click();
    await page.waitForSelector(".oxd-multiselect-chips-selected");
    await expect(page.getByText('Cancelled', { exact: true })).toBeVisible();
    await page.waitForTimeout(3000);

})