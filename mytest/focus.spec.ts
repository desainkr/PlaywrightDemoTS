import { test, expect } from '@playwright/test';
import path from 'path';

test('Focus Element test', async ({ page }) => {
    await page.goto("https://www.orangehrm.com/30-day-free-trial/");
    await page.getByText("Deny").focus();
    await page.getByText("Deny").click();
    await page.waitForTimeout(2000);
    const fullname = await page.locator("#Form_getForm_Name");
    fullname.focus();
    await fullname.fill("Focus testing");
    await page.waitForTimeout(2000);

})