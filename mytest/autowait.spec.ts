import { test, expect } from '@playwright/test';
import path from 'path';
test.use({
    actionTimeout: 10000, //Set the action timeout to 10 seconds for all actions in test
})

test('Focus Element test 1', async ({ page }) => {
    //page.setDefaultTimeout(15000);
    await page.goto("https://classic.freecrm.com/register/");
    await page.locator("//span[normalize-space()='I agree to the1']").check({timeout:5000});


})
test('Focus Element test 2', async ({ page }) => {
    //page.setDefaultTimeout(15000);
    await page.goto("https://classic.freecrm.com/register/");
    await page.locator("//span[normalize-space()='I agree to the1']").check();


})
test('Focus Element test 3', async ({ page }) => {
    //page.setDefaultTimeout(15000);
    await page.goto("https://classic.freecrm.com/register/");
    await page.locator("//span[normalize-space()='I agree to the1']").check();


})