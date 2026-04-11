import { test, expect } from '@playwright/test';
import loginsauce from './/loginsauce.json' with { type: 'json' };
import { log } from 'node:console';

for (const user of loginsauce.users) {

    test(`validandinvalid ${user.username}login SwapLabs web test`, async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill(user.username);
        await page.getByPlaceholder("Password").fill(user.password);
        await page.locator("#login-button").click();

        if (user.expectedUrl) {
            await expect(page).toHaveURL(user.expectedUrl);
            console.log("Valid login completed");
        } else if( user.expectedError) {
            await expect(page.getByText(user.expectedError)).toBeVisible();
            console.log("Invalid login completed");
        }
        /*if (user.expected === "success") {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            await expect(page.getByText('Products')).toBeVisible();
            console.log("Valid login completed");

        } else {
            await expect(page.getByText(
                'Epic sadface: Username and password do not match any user in this service'
            )).toBeVisible();
            console.log("Invalid login completed");
       } 


    if (user.type === "valid") {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    } else {
      await expect(page.getByText(
        'Epic sadface: Username and password do not match any user in this service'
      )).toBeVisible();
    }
            
       */

    })
}
