import { test, expect } from '@playwright/test';

test('handle popups', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
    //multiple pops
    const [popupwindow] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('#PopUp').click()]);
    await page.waitForTimeout(2000);
    const allpopupswindow:page[] = context.pages(); //returns array of pages 
    console.log("Number of popup windows are :", allpopupswindow.length);
    console.log(allpopupswindow[0].url());//https://testautomationpractice.blogspot.com/ 
    console.log(allpopupswindow[1].url());//https://www.selenium.dev/  
    console.log(allpopupswindow[2].url());//https://playwright.dev/

    for(const pw of allpopupswindow){

        const title=await pw.title();

        if(title.includes('Playwright'))
        {
           await pw.locator('.getStarted_Sjon').click();
           await page.waitForTimeout(2000);
           //perform any other actions
           await pw.close();// this will close playwright popup window

        }

     await page.waitForTimeout(2000);
    }

})