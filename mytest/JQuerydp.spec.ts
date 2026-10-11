import { test, expect } from '@playwright/test';

test('JQuery date Picker two', async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator('#datepicker').click();
// Select traget date
const year='2025';
const month='May';
const date='12';

 while(true){
const currentYear= await page.locator(".ui-datepicker-year").innerText();
const currentMonth= await page.locator(".ui-datepicker-month").innerText();
  
if(currentMonth===month && currentYear===year){
             break;
}
 //Future
 //await page.getByText('Next', { exact: true }).click();
 // past
  await page.getByText('Prev', { exact: true }).click();
 }
 const allDates= await page.locator(".ui-datepicker-calendar td a").all();
await page.waitForTimeout(3000); 
  for (let dt of allDates){
    const dateText= await dt.innerText();
      if (dateText === date){
           await dt.click();
            break;
      }
    }

})