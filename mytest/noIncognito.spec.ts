import { test, expect, chromium } from '@playwright/test';
import type { Page } from '@playwright/test';

test('No Incognito test', async () => {
    // Open a browser not in incognito 
    const context = await chromium.launchPersistentContext('',{ headless: false, channel:'chrome'});
    const pages=context.pages(); //2- 0 to 1
    const page: Page = pages[0]!;  // Non-null assertion
    //const page = await browser.newPage(); // it's popening two tabs 
    await page.goto('https://practice.sdetunicorns.com/my-account/', {waitUntil: 'domcontentloaded',});
    await context.close();

})