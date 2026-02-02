import { test, expect,chromium } from '@playwright/test';

/*
Multiple windows or tabs
Syntax:
const[newtab]= await promise.all({
   page.waitForEvent("popup");
   page.click("locator")
})

Syntax:
const[newWindow]= await promise.all({
   context.waitForEvent("page");
   page.click("locator")
})

*/

test('mutiple tabs demo', async ({ }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://demoqa.com/browser-windows");
    //validate new tab
    const [newtab] = await Promise.all([
        page.waitForEvent("popup"),
        await page.locator("#tabButton").click()

    ])
    await newtab.waitForLoadState();
    console.log("new tab url  is :", newtab.url())
    await page.waitForTimeout(2000)
    await newtab.close();

 })


test('mutiple windows demo', async ({ }) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://demoqa.com/browser-windows");
    
    //validate new window

    const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator("#windowButton").click()
    ])
    await newWindow.waitForLoadState();
    console.log("New title fo rthe window is : ", newWindow.url());
    await page.waitForTimeout(2000)
    await newWindow.close();

})