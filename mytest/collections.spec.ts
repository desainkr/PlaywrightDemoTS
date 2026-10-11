import { test, expect } from "@playwright/test";
import { hasUncaughtExceptionCaptureCallback } from "node:process";

test('map example', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.getByRole('textbox', { name: 'Username' }).fill("standard_user")
    await page.getByRole('textbox', { name: 'password' }).fill("secret_sauce")
    await page.getByRole('button', { name: 'Login' }).click()

    await page.waitForTimeout(4000)

    const products = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    //const products =await page.locator('[data-test="inventory-item-name"]').allInnerTexts();
    console.log("The products name thru array", products);

    for (const prod of products) {

        console.log("The products name thru ForOf loop :", prod);


    }

    expect(products.length).toBe(6);
    expect(products[0]).toContain("Sauce Labs Backpack");


})

test('Set example', async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    await page.getByPlaceholder('Search for products, brands and more').fill("laptop");
    await page.keyboard.press("Enter");
    //await page.waitForTimeout(4000)

    // get all product names approach zero
    await page.waitForLoadState("networkidle");
    const alllaptopnames = await page.locator(".RG5Slk").allTextContents();
    // console.log(alllaptopnames);
    /*
    approach 1
    await page.locator(".RG5Slk").waitFor({ state: "visible" });
    const laptopnames = await page.locator(".RG5Slk").allTextContents();
    console.log("The laptop names are : ", laptopnames); 
     //approach 2
    wait page.waitForFunction(() => document.querySelectorAll('.RG5Slk').length > 10);
    const laptopnames = await page.locator(".RG5Slk").allTextContents(); */
    const laptopnames = alllaptopnames.map(product => product.trim().split(' ')[0]);
    console.log("Total laptop names are :", laptopnames);
    const uniquelaptop = new Set(laptopnames);
    console.log("Unique laptops are :", uniquelaptop);
    expect(uniquelaptop).toBe(6);
    




});



