 import { SystemModule } from '@faker-js/faker';
import {test,expect} from '@playwright/test';
import { log } from 'console';


test('Mocking failure API test', async ({ page }) => {
     
    await page.route("**/*/booking/500", async route => {
        await route.fulfill({
            status: 500,
            body: JSON.stringify({ message: 'Server Error' })
        });
    });
 
    const res = await page.goto("https://restful-booker.herokuapp.com/booking/500");
    console.log(res?.status());
    expect(res).not.toBeNull(); 
    const data = await res?.json();
    expect(data.message).toBe('Server Error');
    console.log(data);
   await expect(page.locator('text=Error')).toBeVisible();


})



