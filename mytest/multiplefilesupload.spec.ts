import {test,expect} from '@playwright/test';
import path from 'path';

test('Multiple file upload test',async ({page})=>{
 await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
 //Multiple file upload

 await page.locator("#filesToUpload")
 .setInputFiles(    [
  path.join("C:/Users/desai/OneDrive/Desktop/Balaji2.jpg"),
  path.join("C:/Users/desai/OneDrive/Desktop/Balaji.jpg")


    ]);
    await page.waitForTimeout(2000);

    //deselect files 
    await page.locator("#filesToUpload")
 .setInputFiles(    []);
 await page.waitForTimeout(2000);

})