
import { test, expect } from "@playwright/test";
/*
 Web Table
<Table> - Whole table
<tr>- table row
<td>-table data
<thread>-table header
<tbody>- table body

*/


test('Tables Demo', async ({ page }) => {

    await page.goto("https://letcode.in/table");
    const table = page.locator("#shopping");
    await expect(table).toBeVisible();
    const rows = await page.locator("#shopping tbody tr").count();
    console.log(`No of rows in the table is : ${rows}`);
    expect(rows).toBe(4);
    const cols = await page.locator("#shopping tr th").count();
    console.log(`No of cols in the table is : ${cols}`);
    expect(cols).toBe(2);

    const rowdata = await page.locator("#shopping tbody tr").allInnerTexts();

    for (const row of rowdata) {
        console.log(row);
    }

    const itemname = await page.locator("#shopping tbody tr:nth-child(2) td:nth-child(1)").textContent();
    console.log(`item name is : ${itemname}`);
    expect(itemname).toBe('Apple');

    const itemprice = await page.locator("#shopping tbody tr:nth-child(2) td:nth-child(2)").textContent();
    console.log(`item price is : ${itemprice}`);
    expect(itemprice).toBe("180");

    //validate columns
    const colnames = ['Items', 'Price']
    const colsnames = await page.locator("#shopping tr th").allTextContents();
    console.log(`No of column names are : ${colsnames}`);
    expect(colsnames).toEqual(colnames)


})


test('Lets handle it Table2 Demo', async ({ page }) => {

    await page.goto("https://letcode.in/table");
    const table = page.locator("#simpletable");
    await expect(page.locator("#simpletable")).toBeVisible();

    // const name = "Koushik";
    // const row = page.locator("#simpletable tbody tr").filter({ hasText: name });
    // row.locator(`#first`).check();
    // await expect(row.locator(`#first`)).toBeChecked();
    const names = ['Koushik', 'Yashwanth', 'Iron'];
    //check all checkboxes
    for (const name of names) {
        const row = page.locator("#simpletable tbody tr").filter({ hasText: name });
        await row.locator('input[type="checkbox"]').check();
        await expect(row.locator('input[type="checkbox"]')).toBeChecked();
    }




    await page.waitForTimeout(5000)

})


test.only('Sortable Tables Demo', async ({ page }) => {

    await page.goto("https://letcode.in/table");
    const table = page.locator(".mat-sort");
    await expect(page.locator(".mat-sort")).toBeVisible();
    const calories = await page.locator(".mat-sort tr td:nth-of-type(2)").allInnerTexts();
    //nth-of-type(2) when br in the middle of two tags(<td>159</td> br <td>6</td>)
    //#shopping tbody tr:nth-child(2)when NO br in the middle of two tags(<td>159</td><td>6</td>)
    //console.log(calories);

    // const isSorted=calories.join()===[...calories].sort().join();
    // console.log(isSorted);
    // expect(isSorted).toBe(true);
        
   await page.waitForTimeout(5000)

   const carbs = await page.locator(".mat-sort tr td:nth-of-type(4)").allTextContents();
    //nth-of-type(2) when br in the middle of two tags(<td>159</td> br <td>6</td>)
    //#shopping tbody tr:nth-child(2)when NO br in the middle of two tags(<td>159</td><td>6</td>)
    console.log(carbs);

    const isSorted1=carbs.join()===[...carbs].sort().join();
    console.log(isSorted1);
    //await expect(isSorted1).toBe(true);

})