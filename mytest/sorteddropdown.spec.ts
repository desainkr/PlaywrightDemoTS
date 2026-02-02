import { test, expect, chromium } from '@playwright/test';
import type { Page } from '@playwright/test'
import { log } from 'node:console';

test('verify dropdown is sorted', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    //const colorsdropdown = page.locator("#animals>option");
    const colorsdropdown = page.locator("#colors>option");
    //console.log(await colorsdropdown.allTextContents());
    const colorsdptext = (await colorsdropdown.allTextContents()).map(text => text.trim());
    //console.log(colorsdptext);
    const oginallist =[...colorsdptext];
    const sortedlist = [...colorsdptext.sort()];
    console.log("Origional list :", oginallist);
    console.log("Sorted list  :", sortedlist);
    expect(oginallist).toEqual(sortedlist);
}
)