import { test, expect, chromium } from '@playwright/test';
import type { Page } from '@playwright/test'
import { log } from 'node:console';

test('dropdown test', async () => {

    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://practice.expandtesting.com/dropdown");

    //Seelct DP CSS
    const dp = "select#country";
    // Selecting DP values 
    await page.locator("select#country").selectOption('US');
    //await page.selectOption(dp, { value: 'US' });
    //await page.selectOption(dp, { label: 'Peru' });
    //await page.selectOption(dp, { index: 10 });
    //select#country>option

    //2) check number of options in the dropdown(count)
    const dropdownOptions= page.locator('#country>option');
    await expect(dropdownOptions).toHaveCount(252);

    //3) check an option present in the dropdown

    const optionsText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());   
    console.log(optionsText)

    expect(optionsText).toContain('Brazil'); // Check if the array contains "Brazil"

    /*const alloptions = await page.$$(dp + ' > option');
    console.log(alloptions.length);
    await page.waitForTimeout(1000);

    for (const e of alloptions) {
        const text = await e.textContent();
        console.log(text); */

        //4.printing options from the drop down

        for( const option of optionsText){
           console.log(option);
        
        
        }


    }
)