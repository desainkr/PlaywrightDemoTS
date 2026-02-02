import { test, expect } from '@playwright/test';


test('simple Dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("return type of dialog :", dialog.type());
        expect(dialog.type()).toContain("alert");
        console.log("return message from dialog :", dialog.message());
        expect(dialog.message()).toContain("I am an alert box!");
        dialog.accept();
    });
    await page.getByRole('button', { name: 'Simple Alert' }).click(); //Opens dialog

    await page.waitForTimeout(3000);

})

test ('Confirmation Dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("return type of dialog :", dialog.type());
        expect(dialog.type()).toContain("confirm");
        console.log("return message from dialog :", dialog.message());
        expect(dialog.message()).toContain("Press a button!");
       // dialog.accept(); // close dialog by accept
       dialog.dismiss();//close dialog by cancel

    });
    await page.getByRole('button', { name: 'Confirmation Alert' }).click(); //Opens dialog
    const acceptmessage = await page.locator("#demo").innerText();
    console.log("return accept message  :", acceptmessage);
    //await expect(acceptmessage).toContain("You pressed OK!");
   expect(acceptmessage).toContain("You pressed Cancel!");

    await page.waitForTimeout(3000);

})


test.only ('Promt Dialog', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("return type of dialog :", dialog.type());
        expect(dialog.type()).toContain("prompt");
        console.log("return message from dialog :", dialog.message());
        expect(dialog.message()).toContain("Please enter your name:");

        expect(dialog.defaultValue()).toContain("Harry Potter"); //Checking default value
         
       dialog.accept("John"); // close dialog by accept
      

    });
    await page.getByRole('button', { name: 'Prompt Alert' }).click(); //Opens dialog
    const acceptmessage = await page.locator("#demo").innerText();
    console.log("return accept message  :", acceptmessage);
    //await expect(acceptmessage).toContain("You pressed OK!");
    await expect(page.locator("#demo")).toHaveText("Hello John! How are you today?");
   // expect(acceptmessage).toContain("Hello John! How are you today?");

    await page.waitForTimeout(3000);

})