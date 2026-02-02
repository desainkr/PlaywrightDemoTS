import { test, expect } from "@playwright/test";


test('Mouse Actions Demo', async ({ page }) => {

    await page.goto("https://play1.automationcamp.ir/mouse_events.html");
    await expect(page.locator(".col-sm-6 #click_type")).not.toBeVisible()
    await page.locator("div #click_area").click();
    await page.waitForTimeout(4000);
    //validate click icon is visiable 
    await expect(page.locator(".col-sm-6 #click_type")).toBeVisible()
    await expect(page.locator(".col-sm-6 #click_type")).toHaveText("Click")
    // valadate right click
    // await page.waitForTimeout(4000);
    // await page.locator("div #click_area").click({ button: 'right' });
    // expect(page.getByText('Right-Click', { exact: true })).toBeVisible();
    // expect(page.getByText('Right-Click', { exact: true })).toHaveText("Right-Click");

    //VAlidate doubleclick 
    await page.waitForTimeout(4000);
    await page.locator("div #click_area").dblclick();
    expect(page.getByText('Double-Click', { exact: true })).toBeVisible();
    expect(page.getByText('Double-Click', { exact: true })).toHaveText("Double-Click");

    //Validate mouse over
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Choose Language' }).hover();
    await page.locator("text='Java'").click();
    await expect(page.locator(".col-sm-6.p-3 #hover_validate")).toBeVisible();
    await expect(page.locator(".col-sm-6.p-3 #hover_validate")).toHaveText("Java");


    //Drag and Drop validations
    await page.waitForTimeout(4000);
    const sourceimg = page.locator("#drag_source");
    const targetimg = page.locator("#drop_target");
    await sourceimg.dragTo(targetimg); //--working fine recommended 
    // await page.waitForSelector("#drag_source", { state: "visible" });
    // await page.waitForSelector("#drop_target", { state: "visible" });
    // await page.dragAndDrop("#drag_source", "#drop_target");
    await expect(page.getByRole('heading', { name: 'Drop is successful!', level: 3 })).toHaveText("Drop is successful!");
  //scrolling
   await page.mouse.wheel(0,500);
   await page.waitForTimeout(4000);



})