import { test, expect } from '@playwright/test';
// import fs from 'fs';

 //Reading the data from JSON
// const jsonPath ="testdata/datafile.json";
// const loginData:any=JSON.parse(fs.readFileSync(jsonPath,'utf-8'));
                    //or
import loginData from '../testdata/datafile.json' with {type:'json'};

//main test
for (const {email, password, validity} of loginData) {
    test.describe('login data drive test with JSON', async () => {
        test(`login test with JSON for ${email} and ${password}`, async ({ page }) => {
            //fill login form 
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator('#Email').fill(email ?? "");  //“If email is null or undefined, use "" (empty string) instead”
            await page.locator('#Password').fill(password ?? "");//“If password is null or undefined, use "" (empty string) instead”
            await page.locator('input[type="submit"][value="Log in"]').click();

            if (validity?.toLowerCase() === 'valid') {
                // Asser logout is visible - indicates successful login
                const logoutlink = page.getByRole('link', { name: 'Log out' });
                await expect(logoutlink).toBeVisible({ timeout: 3000 });
            } else {
                //assert error message 
                const errorMessage = page.locator(".validation-summary-errors");
                await expect(errorMessage).toBeVisible({ timeout: 3000 })

                //assert user is still on the login page
                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

            }
        })
    })
}