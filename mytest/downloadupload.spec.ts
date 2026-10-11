import {test,expect} from '@playwright/test';
import path from 'path';


test.only('Diownload file',async ({page}) => {

await page.goto("https://the-internet.herokuapp.com/download");
//page.on('download') only listens to future events, not past ones
/*page.on('download', async (download) => {
  const path = await download.path();
  console.log("Downloaded file path:", path);
}); */
const [download]= await Promise.all([
               page.waitForEvent("download"),
               page.getByRole('link', { name: 'some-file.txt' }).click()
])
         const fileName= download.suggestedFilename();
         await download.saveAs(fileName);
         console.log("Downloaded:", fileName);
     })

test('upload file',async ({page}) => {

await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
await page.setInputFiles("input[type='file']",["uploadItems/Balaji2.jpg","uploadItems/Balaji.jpg"]);



})