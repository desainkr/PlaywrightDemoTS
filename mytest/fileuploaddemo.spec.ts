import {test, expect} from '@playwright/test';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



test('file upload', async ({page})=>{

// await page.goto("https://testpages.eviltester.com/pages/files/file-upload/");
// //SetInputFiles()- Single file upload
// const filepath= path.join(__dirname,'uploads',"Balaji2.jpg")
// await page.waitForSelector("#fileinput", { state: "visible"});
// //await page.locator("#fileinput").setInputFiles(filepath);
// await page.setInputFiles("#fileinput",filepath);
// await page.locator("#itsanimage").check();
// await page.getByRole('button', { name: 'Upload' }).click();
// await expect(page.getByText('You uploaded a file to the server.', { exact: true })).toBeVisible();
// await expect(page.getByText('You uploaded a file to the server.', { exact: true })).toHaveText('You uploaded a file to the server.');


//Mutiple files upload
await page.goto("http://uitestingplayground.com/upload/");
const filepath1= path.join(__dirname,'uploads',"Balaji2.jpg")
const filepath2= path.join(__dirname,'uploads',"Balaji.jpg")
const frame= page.frameLocator('iframe[src="/static/upload.html"]')
await frame.locator("#browse").waitFor({ state: 'attached' });
await frame.locator("#browse").setInputFiles([filepath1,filepath2]);
//await page.locator("#fileinput").setInputFiles([filepath1,filepath2])
await page.waitForTimeout(4000)

})