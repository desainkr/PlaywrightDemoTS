import { test, expect, chromium } from '@playwright/test'

test('new tab demo', async ({page,context}) => {
    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('button', { name: 'New Tab' }).click()
      ]);
      
    await newpage.waitForLoadState();
    await newpage.bringToFront();
    console.log(await newpage.title());

    const pages = context.pages();
    await pages[0]?.bringToFront();
    await pages[1]?.bringToFront();
    for (let p of pages) { 
     
        if ((await p.title()).includes("SDET-QA Blog")) { 
            await p.bringToFront();
            break;

        }
    }
    



})