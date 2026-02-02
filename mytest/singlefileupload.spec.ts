import {test,expect,Page} from '@playwright/test';


test('single file upload test',async ({page})=>{
 await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html");
 //Single file upload
 await page.locator("input[name='upfile']").setInputFiles("C:/Users/desai/OneDrive/Desktop/Balaji2.jpg");
 await page.waitForTimeout(2000);

 //Deselect file 
await page.locator("input[name='upfile']").setInputFiles([]);
 await page.waitForTimeout(2000);



})