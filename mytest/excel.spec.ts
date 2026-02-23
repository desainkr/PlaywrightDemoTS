import { test, expect } from '@playwright/test';
import XLSX from 'xlsx';
import * as fs from 'fs';
import path from 'path';

interface UserData {

    Email: string;
    Password: string

}

test('Login application thru excel data', async ({ page }) => {

    const workbook = XLSX.readFile('./testdata/pwexcellogindata.xlsx');
    const worksheet = workbook.Sheets["Sheet1"];
    if (!worksheet) {
        throw new Error('Sheet1 not found in Excel file');
    }
    //Convert sheet into Json
    const xlsToJson = XLSX.utils.sheet_to_json<UserData>(worksheet);
   //  console.log(xlsToJson);
    for (const user of xlsToJson) {
        // wait for navigation to finish (optional but recommended)
        await page.waitForLoadState('networkidle');
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
        // if (xlsToJson.length === 0) {
        // throw new Error("No data found in Excel sheet");
        // }
        await page.locator('#input-email').fill(`${user.Email}`);
        await page.locator('#input-password').fill(`${user.Password}`);
        await page.locator("input[value='Login']").click();
        await expect(page.locator('h2').first()).toHaveText('My Account');
        await page.getByRole('link', { name: 'Logout' }).click();
        await page.getByRole('link', { name: 'Continue' }).click()
        await page.waitForURL(/naveenautomationlabs.com/);
         
    }


})