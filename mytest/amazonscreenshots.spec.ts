import { test, expect } from "@playwright/test";

test('Screenshots from Amazon web', async ({ page }) => {

    await page.goto("https://amazon.com");
    //await page.waitForTimeout(2000)
    //await page.screenshot({path: `screenshots/amazon1- ${Date.now()}.png`});//visible part of the web page
    // full page
    //await page.screenshot({ path: `screenshots/amazon2- ${Date.now()}.png`, fullPage: true });//full page of web page
    // add time stamp
    //await page.screenshot({ path: `screenshots/amazon3- ${Date.now()}.png`});// time stamp with of web page
     //config in config file- screenshot:'only-on-failure'
    //await page.locator("#twotabsearchtextbox1").fill("screenshot")
   //screenshot for element
 const ele= page.locator("#twotabsearchtextbox");
 //const ele= page.$("#twotabsearchtextbox");
 await ele.screenshot({path: 'screenshots/element.png'})


})