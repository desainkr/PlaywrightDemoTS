import { test, expect, type Locator } from "@playwright/test";
import { log } from "node:console";

test('static table test2', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = page.locator("[name='BookTable'] tbody");
    await expect(table).toBeVisible();
    //Count number of  rows  in a table  
    const rows = page.locator("[name='BookTable'] tbody tr");
    const rowsCount = await rows.count();
    expect(rowsCount).toBe(7)
    console.log("Row count is", rowsCount); //7
    // Count number of  columns  in a table  
    const columns = page.locator("[name='BookTable'] tbody tr th");
    const columnCount = await columns.count();
    expect(columnCount).toBe(4)
    console.log("Column count is", columnCount); //4

    // read the data  from 2nd row 
    //const secondRowData= await rows.nth(2).innerText(); //working
    const secondRowCells = rows.nth(2).locator('td');
    const seconRowTexts: String[] = await secondRowCells.allInnerTexts();
    console.log("2nd row data", seconRowTexts);//[ 'Learn Java', 'Mukesh', 'Java', '500' ]
    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);//Assertion

    console.log("printing 2nd row data using of Loop ..............");

    for (let text of seconRowTexts) {
        console.log(text);

    }
    // 4.read all data from the table
    console.log("printing all data using of Loop ..............");
    const tableData = await page.locator('[name="BookTable"] tbody tr').all();
    for (let rowData of tableData.slice(1)) //slice(1)-->Skip header row
    {
        const cols = await rowData.locator('td').allInnerTexts();
        console.log(cols.join('\t'));

    }

    // 5.print book names where author is Mukesh
    console.log("Books writtenby Mukesh ..............");
    const mukeshBooks: string[]=[];
    for (let row of tableData.slice(1)) //slice(1)-->Skip header row
    {
        const cells = await row.locator('td').allInnerTexts();
        const author = cells[1];
        const book = cells[0];
        if (author === 'Mukesh') {
            console.log(`${author} \t ${book}`)
            mukeshBooks.push(book);

        }

    }
    expect(mukeshBooks).toHaveLength(2); //Assertion
     
    //6.calculate total price of all books
      let totalPrice:number=0;
     for (let row of tableData.slice(1)) //slice(1)-->Skip header row
    {
        const cells = await row.locator('td').allInnerTexts();
        const price = cells[3];
         totalPrice=totalPrice+parseInt(price);
        

        

    }
   console.log("Total Price :",totalPrice);
   await expect(totalPrice).toBe(7100);
});