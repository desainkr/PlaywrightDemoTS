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
    await page.locator("select#country").click();
    await page.waitForTimeout(2000);
    await page.getByText('Japan').click();
    await page.waitForTimeout(2000);


}



)