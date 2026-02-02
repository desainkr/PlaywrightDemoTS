import { test, expect } from '@playwright/test';


test('example from playwright web', async ({ page }) => {

    await page.goto("https://playwright.dev/");
    await page.getByRole('link', {name: "Get started"}).click();
    await page.getByRole('button', { name: 'Node.js' }).hover();
    await page.getByText('Java', { exact: true }).click();
    console.log(page.url);
    
    await expect(page).toHaveURL("https://playwright.dev/java/docs/intro");

    await expect(page.getByText("Installing Playwright",{exact:true})).not.toBeVisible();

   const java = "Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's"

   // await expect(java).toBeTruthy();
   await expect(page.getByText(java)).toBeVisible();




})