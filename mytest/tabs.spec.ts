import { test, expect, chromium } from '@playwright/test';

test('handle tabs', async () => {

    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();

    const parentpage = await context.newPage();
    await parentpage.goto("https://testautomationpractice.blogspot.com/");
    // these two statements should go parallely 
    // await context.waitForEvent('page'); //pending ,fullfiled ,rejected 
    //await parentpage.locator("button[onclick='myFunction()']").click();

    const [childpage] = await Promise.all([
        context.waitForEvent('page'),
        parentpage.locator("button[onclick='myFunction()']").click(),
    ])
    // Appraoch 1: switch between pages and get titles(using context)
    const pages = context.pages();
    console.log("Number of pages  are :", pages.length);
    console.log("Title of parent page :", await pages[0]?.title());
    console.log("Title of  child page :", await pages[1]?.title());
    
    // Appraoch 2: alternate
    console.log("Title of parent page :", await parentpage.title());
    console.log("Title of  child page :", await childpage.title());

})