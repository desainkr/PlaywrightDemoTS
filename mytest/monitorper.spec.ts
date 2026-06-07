
import { test, expect } from '@playwright/test';

test('Peformance test1', async ({ page }, testInfo) => {
    const start = Date.now();
    await page.goto("https://www.demoblaze.com/");
    console.log(Date.now() - start);

});