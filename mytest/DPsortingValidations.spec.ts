import { test, expect } from '@playwright/test';


test('Doprdown Name A to Z', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.locator('[data-test="username"]').fill("standard_user")
    await page.locator('[data-test="password"]').fill("secret_sauce")
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    await expect(page).toHaveTitle("Swag Labs")
    const allProductNames = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    console.log(allProductNames);
    const sortedProductNamesAsc = [...allProductNames].sort((a, b) => a.localeCompare(b));
    console.log(sortedProductNamesAsc);
    expect(allProductNames).toEqual(sortedProductNamesAsc);
})


test('Doprdown Name Z to A', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user")
    await page.locator('[data-test="password"]').fill("secret_sauce")
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    await expect(page).toHaveTitle("Swag Labs")
    // click ing on dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption({ value: 'za' });
    // get all products
    const allProductNamesAsc = await page.locator('[data-test="inventory-item-name"]').allTextContents();
    console.log(allProductNamesAsc);

    // apply sorting Desc order
    const sortedProductNamesDesc = [...allProductNamesAsc].sort((a, b) => b.localeCompare(a));
    console.log(sortedProductNamesDesc);
    expect(allProductNamesAsc).toEqual(sortedProductNamesDesc);

})
test('Doprdown Price low to high', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user")
    await page.locator('[data-test="password"]').fill("secret_sauce")
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    await expect(page).toHaveTitle("Swag Labs")
    // click ing on dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption({ value: 'lohi' });
    // get all products
    const productPriceLW = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    console.log(productPriceLW);
    const numericalPrice = productPriceLW.map(price => Number(price.replace('$', '')));
    console.log(numericalPrice);

    const sortedPrice = [...numericalPrice].sort((a, b) => a-b);
    console.log(sortedPrice);
    expect(numericalPrice).toEqual(sortedPrice);
    
})


test.only('Doprdown Price High to Low', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user")
    await page.locator('[data-test="password"]').fill("secret_sauce")
    await page.locator('[data-test="login-button"]').click()
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    await expect(page).toHaveTitle("Swag Labs")
    // click ing on dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption({ value: 'hilo' });
    // get all products
    const productPriceHL = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    console.log(productPriceHL);
    const numericalPriceHL = productPriceHL.map(price => Number(price.replace('$', '')));
    console.log(numericalPriceHL);

    const sortedPriceHL = [...numericalPriceHL].sort((a, b) => b-a);
    console.log(sortedPriceHL);
    expect(numericalPriceHL).toEqual(sortedPriceHL);
    
})