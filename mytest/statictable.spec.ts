import { test, expect, type Locator } from "@playwright/test";
import { log } from "node:console";

test('static table test', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const table = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1.count number of rows in a table
    //const rows1= await page.locator("table[name='BookTable']>tbody>tr")
    //expect(rows1).toHaveCount(7); //approach 1
    const rows = table.locator("tr");//Chaining locator
    const rowscount = await rows.count(); //returns all the rows including header
    console.log("no of rows in a table : ", rowscount);
    expect(rowscount).toBe(7);  //appraoch 2

    //2.count number of headers/columns

    const columns = rows.locator("th"); //Chaining locator
    console.log("number of columns in a table :", await columns.count());
    await expect(columns).toHaveCount(4);
    const columncount = await columns.count();
    expect(columncount).toBe(4);

    //3.read all data from 2nd row(index 2 means 3rd row including header)
    //("table[name='BookTable'] tbody tr").nth(2).locator('td')

    const secondRow = page.locator("table[name='BookTable'] tbody tr").nth(2);
    const secondRowCells: Locator = page.locator("table[name='BookTable'] tbody tr").nth(2).locator('td');
    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);
    const secondRowText = await secondRowCells.allInnerTexts();
    console.log("Second row table data :", secondRowText);
    const count = secondRowText.length;
    expect(count).toBe(4);

    for (const secondrowtext of secondRowText) {
        console.log(secondrowtext);

    }
    //4.Read all data from the table(excluding Header)

    //const allRowCells:Locator = page.locator("table[name='BookTable'] tbody tr").locator('td');
    //const dataRows = page.locator( "table[name='BookTable'] tbody tr:has(td)");
    //This explicitly means: “Give me only rows that contain <td>”  ✔ Very readable  ✔ Very safe */
    //console.log("All rows data from the table :" , await dataRows.allInnerTexts());
    /*
    const rowsdata = await dataRows.allInnerTexts();
    
    
    const tableData = rowsdata.map(row => {
      const [BookName, Author, Subject, Price] = row.split('\t');
      return { BookName, Author, Subject, Price };
    });
    console.table(tableData);
    
    const tableformat = rowsdata.map(text => text.split('\t'));
    console.log(tableformat);*/

    const allRowData = await rows.all();//get all row locators //all() returns array of locators

    console.log("BookName	Author	Subject	Price");
    /*
    for (const row of allRowData.slice(1)) { //slice(1) --> skip header now
    
          const cols=await row.locator("td").allInnerTexts();
          console.log(cols.join('\t')); 
    }*/
    //print book names wherever author as Mukesh
    console.log("Books written by mukesh");

    const mukesbooks: string[] = [];

    for (let row of allRowData.slice(1)) { //slice(1) --> skip header now
        const cells = await row.locator("td").allInnerTexts();
        const book = cells[0];
        const author = cells[1];
        if (author === 'Mukesh') {
            console.log(`${author} \t ${book}`);
            mukesbooks.push(book);

        }

    }
    expect(mukesbooks).toHaveLength(2);  //Assertion

    // 6.total price of books
   let totalprice = 0;

for (const row of allRowData.slice(1)) {
    const pricecells = await row.locator("td").allInnerTexts();

    const price = pricecells[3];
    if (price === undefined) continue; // ✅ correct variable

    totalprice += Number(price.trim()); // ✅ trim on string
    //totalprice = totalprice + Number(price.trim());
}

console.log("Total Price :", totalprice);

});