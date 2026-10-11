import { test, expect } from '@playwright/test';

//testdata 
const serachItems:string[]= [
'laptop','Gift card','smartphone','monitor'
];
/*
//using for of loop
for (let item of serachItems){
test(`search parameter test for ${item}`, async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator('[name="q"]').fill(item);
    await page.locator('input[type="submit"][value="Search"]').click();
    await expect.soft(page.locator("h2 a").nth(0)).toContainText(item, { ignoreCase: true })
})
} 

// using forEach function

serachItems.forEach((item) => {
 test(`search parameter test for ${item}`, async ({ page }) => {   
     
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator('[name="q"]').fill(item);
    await page.locator('input[type="submit"][value="Search"]').click();
    await expect.soft(page.locator("h2 a").nth(0)).toContainText(item, { ignoreCase: true })
}); 
});
*/
// describer
test.describe('Searching items using parameter' ,async ()=>{
serachItems.forEach((item) => {
 test(`search parameter test for ${item}`, async ({ page }) => {   
     
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator('[name="q"]').fill(item);
    await page.locator('input[type="submit"][value="Search"]').click();
    await expect.soft(page.locator("h2 a").nth(0)).toContainText(item, { ignoreCase: true })
}); 
});






})