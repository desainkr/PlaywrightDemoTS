import { test, expect } from '@playwright/test';
import fs from 'fs';

//Import Json file directly 
import jsondata from "../testdata/data.json" with { type: "json" };

//import jsondata from 'testdata/data.json'

// const jsonfilepath= "testdata/data.json";
//  const jsonddata= JSON.parse(readFileSync(jsonfilepath,'utf-8'));

test.describe('Login data driven test', async()=> {

    for (const data of jsondata) {
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
