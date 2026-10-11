import { test, expect } from "@playwright/test";

test('performance test', async ({ page }) => {
    
const start = Date.now();
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
console.log(Date.now() - start);




})