import { test, expect } from '@playwright/test';

//Text Input/Text Box/input Box
test('Text input Actions', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const textbox = page.getByPlaceholder("Enter Name");
    expect(textbox).toBeVisible();
    expect(textbox).toBeEnabled();
    expect(textbox).toBeEditable();
    const maxlennametxtbox = await textbox.getAttribute("maxlength");
    // console.log("The max length of name text box is:", maxlennametxtbox);
    expect(maxlennametxtbox).toBe("15");
    await textbox.fill("test");
    // console.log("text content of Firstname :", await textbox.textContent());//returns empty
    const inputvalue = await textbox.inputValue()
    console.log("text content of Firstname :", await textbox.inputValue());//returns inputValue of text box
    expect(inputvalue).toBe("test");

})
// Radio buttons
test('Radio Button Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleradiobutton = page.locator("#male");
    await expect(maleradiobutton).toBeVisible();
    await expect(maleradiobutton).toBeEnabled();
    await expect(maleradiobutton).not.toBeChecked();
    const isrbununchecked = await maleradiobutton.isChecked();
    expect(isrbununchecked).toBe(false);
    const radiobuttonchecked = await maleradiobutton.check();  //select radio button
    const isrbunchecked = await maleradiobutton.isChecked();
    await expect(isrbunchecked).toBe(true);
    await expect(maleradiobutton).toBeChecked();
    await page.waitForTimeout(2000);
})

//Checkbox

test.only('Check box Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    //1.Seelct specific checkbox(Sunday) using getByLabel and assert
    const suncheckbox = page.getByLabel("Sunday");
    await expect(suncheckbox).toBeVisible();
    await expect(suncheckbox).toBeEnabled();
    await expect(suncheckbox).not.toBeChecked();
    //const checkboxchecked= await suncheckbox.check();
    //await expect(suncheckbox).toBeChecked();
    //2.Capture all checkboxes  and assert each is checked (days of the week)
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const checkboxes:any = days.map(day => page.getByLabel(day));
    expect(checkboxes.length).toBe(7);


    //3.select all checkbox and assert each is checked

    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(3000);

    for (const day of days) {
        const checkbox = page.getByLabel(day);
        await checkbox.check();
        await expect(checkbox).toBeChecked();

    }

    // 4. uncheck last 3 checkboxes and assert

    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();

    }
    await page.waitForTimeout(3000);

    // 5. Toggel Checkboxes : if checked , uncheck; If unchecked ,check assert state flipped 

    for (const checkbox of checkboxes) {

        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();

        }
          
    }
    await page.waitForTimeout(3000);

    //6.Randomely seelect check boxes - select checkboxes by index (1,3,6)  and assert

     const indexes:number[]=[1,3,6];

     for (const i of indexes) {
         await checkboxes[i].check();
         await expect(checkboxes[i]).toBeChecked();
     }
        await page.waitForTimeout(3000);
  //7.select the checkbox based on the label
    const weekname:string='Friday';
    for (const label of days){

    if(label.toLowerCase()===weekname.toLowerCase())
    {
       const checkbox=page.getByLabel(label);
       checkbox.check();
       await expect(checkbox).toBeChecked();
    }
    }
      await page.waitForTimeout(3000);
})

