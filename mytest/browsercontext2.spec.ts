import { test, expect, chromium } from '@playwright/test';

//Browser ---> Context----->Pages
//Browser --->Chromium(chrome+Edge).firefox ,webkit
//Contexts ---> we can have multiple contexts for mutiple users/apps for the same browser
// provide a way to operate mutiple independent browser sessions
//Page:  ----> New Tab,window Popup


test('Browsercontext Demo', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    // Creating 2 pages 
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    console.log("No of pages created :", context.pages().length);//2
    await page1.goto("https://playwright.dev/");
    await expect(page1).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")
    await page2.goto("https://testautomationpractice.blogspot.com/");
    await expect(page2).toHaveTitle("Automation Testing Practice")
    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);
    await context.close();
    browser.close();

    /* await page.goto("https://testautomationpractice.blogspot.com/");
     await Promise.all([
         page.waitForEvent("popup"),
         page.locator('#PopUp').click(),
         //page.locator('#PopUp').click(),
     ]);
     await expect(page).toHaveTitle('Automation Testing Practice');
     //await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
 */
});

