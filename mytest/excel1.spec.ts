import { test, expect } from '@playwright/test';
import fs from 'fs';
import XLSX from 'xlsx'

   const excelpath= "testdata/data.xlsx"
   const workbook = XLSX.readFile(excelpath);
   const  sheetnames= workbook.SheetNames[0];
   const  worksheet= workbook.Sheets[sheetnames];
     if (!worksheet) {
        throw new Error('Sheet1 not found in Excel file');
    }
   //convert sheet to JSON
   const xlsxToJson=XLSX.utils.sheet_to_json<UserData>(worksheet)

interface UserData {

    email: string;
    password: string;
    validity: string

}
//Main Test
test.describe('Login data driven test with excel file', async()=> {

    for (const data of xlsxToJson) {
          if (!data) {
        throw new Error('Data not found in csv file');
    }
            test(`Login test with email: "${data.email}" and password: "${data.password}"`, async ({ page }) => {
                await page.goto('https://demowebshop.tricentis.com/login');

                // Fill login form
                await page.locator('#Email').fill(data.email);
                await page.locator('#Password').fill(data.password);
                await page.locator('input[value="Log in"]').click();

                if (data.validity.toLowerCase() === 'valid') {
                    // Assert logout link is visible - indicates successful login
                    const logoutLink = page.locator('a[href="/logout"]');
                    await expect(logoutLink).toBeVisible({ timeout: 5000 });
                } else {
                    // Assert error message is visible
                    const errorMessage = page.locator('.validation-summary-errors');
                    await expect(errorMessage).toBeVisible({ timeout: 5000 });

                    // Assert user is still on the login page
                    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
                }
            });
        }



});
