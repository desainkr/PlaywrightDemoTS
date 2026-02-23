import { test as base, expect, type Page } from "@playwright/test";

type Myfixtures = {

    loggedInPage: Page,
}
const test = base.extend<Myfixtures>({


    loggedInPage: async ({ page }, use) => {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
        await page.locator('#input-email').fill('pwtest@gmail.com');
        await page.locator('#input-password').fill('playwright@77');
        await page.locator("input[value='Login']").click();
        

        await use(page)
    }
     
})
export {test,expect}