import { test, expect } from '@playwright/test';

test('verify dynamictable test', async ({ page }) => {

  await page.goto("https://practice.expandtesting.com/dynamic-table");

  const table = page.locator("table.table tbody");
  await expect(table).toBeVisible();
  //select all the rows ,then find number of rows 
  const rows = table.locator("tr");
  const rowscount = await rows.count();
  console.log("Number of rows in a table::", await rows.count());
  await expect(rows).toHaveCount(4)
  /* const rows= await table.locator("tr").all();
   console.log("Number of rows in a table:", rows.length);
   expect(rows).toHaveLength(4) */
  let cpuload = '';
  for (let i = 0; i < rowscount; i++) {
    const processName = await rows
      .nth(i)               // pick the row
      .locator("td")        // find cells inside that row
      .nth(0)               // first column
      .innerText();
    //  console.log(processName);

    /*if (processName==="Chrome")
    {
      // const cpuload= await rows.locator('td:has-text("%")').innerText();
    
      const cpuload= await rows.nath(i).locator("td",{hasText:'%'}).innerText();
      console.log("CPU load percentise :",cpuload);
      break;
    } */

    if (processName === "Chrome") {
      cpuload = await rows
        .nth(i)                 // 👈 scope to the Chrome row
        .locator("td")          // cells in this row
        .filter({ hasText: '%' })
        .innerText();

      console.log("CPU load percentage:", cpuload);
      break;
    }
  }
  //step2 :compare it with value in the yellow label.
   await expect(page.locator("#chrome-cpu")).toContainText(cpuload);
  let yellowlabeltext: string = await page.locator("#chrome-cpu").innerText();
  console.log("The yellow label text is :", yellowlabeltext);
 /* if (yellowlabeltext.includes(cpuload)) {
    console.log("CPU load of Chrome is equal");
  } else {
    console.log("CPU load of Chrome is NOT equal");
  }*/
  if (yellowlabeltext.match(cpuload)) {
  console.log("CPU load of Chrome is equal");
}else{
  console.log("CPU load of Chrome is NOT equal");
}
  expect(yellowlabeltext).toContain(cpuload);

})