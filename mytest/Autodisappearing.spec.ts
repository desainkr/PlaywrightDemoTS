import {test,expect} from '@playwright/test';

test('Handling disappering element in textbox',async ({page})=>{

    await page.goto("https://demoqa.com/automation-practice-form");

    const subject= page.locator(".subjects-auto-complete__input-container");
    await subject.click();
    await subject.pressSequentially('M');
    const dropdownElement= page.locator(".subjects-auto-complete__option").first();
    await dropdownElement.waitFor();

})