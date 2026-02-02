import {test, expect} from '@playwright/test';


test('storage login test',async ({page})=>{

    await page.goto("https://tutorialsninja.com/demo/index.php?route=account/login");
    // Login to application
    await page.getByPlaceholder("E-Mail Address").fill("neel@gmail.com");
    await page.getByPlaceholder("Password").fill("Test@123");
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForTimeout(6000)

    //save staorage 
    await page.context().storageState({path: 'testdata/authentication.json'});

   //https://tutorialsninja.com/demo/index.php?route=account/account



})