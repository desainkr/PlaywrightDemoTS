import { test, expect, chromium } from '@playwright/test';
import type { Page } from '@playwright/test'
import { log } from 'node:console';

test('Multi select dropdown test', async () => {

    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    // 1. Selecting option from the DP values 
    //await page.locator("select[id='colors']").selectOption(['Red','Blue','Green']);//using visible text
    //await page.locator("select[id='colors']").selectOption(['yellow','White','blue']); //using value attribute text
    //await page.locator("select[id='colors']").selectOption([{label:'Red'},{label:'Green'},{label:"Yellow"}]); //using label text
    await page.locator("select[id='colors']").selectOption([{ index: 3 }, { index: 4 }, { index: 5 }, { index: 6 }]); //using index
   
    // 2.check number of options in the dropdown(count)
    const dpoptions = page.locator("#colors>option");

    await expect(dpoptions).toHaveCount(7);

    // 3. check an option present in the dropdown
    console.log(await dpoptions.allTextContents());

    const optionsText = (await dpoptions.allTextContents()).map(text => text.trim());
    console.log(optionsText);
    expect(optionsText).toContain('Red')  //Check if the array contains "Red"

    // 4.printing options from the drop down
    for (const option of optionsText) {
        console.log(option);
        
        
    }


}
)