import { test, expect } from '@playwright/test';


test('Screen shot Demo', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    const screenshot= await page.screenshot();
    //expect(screenshot).toMatchSnapshot('Swaglabs.png');
    page.getByRole('textbox', { name: 'Username' });

});