import { test, expect } from '@playwright/test';

test('verify dynamictable test', async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com/");

  // select  the table
  const table = page.locator("#taskTable tbody");
  await expect(table).toBeVisible();

  //select all the rows ,then find number of rows 
  const rows = table.locator("tr");
  const rowscount = await rows.count();
  console.log("number of rows in a table", rowscount);
  await expect(rows).toHaveCount(4);
  expect(rowscount).toBe(4);
  //CPU load of Chrome process: 1.2%
  let cpuload = '';

  for (let i = 0; i < rowscount; i++) {
    const chromeprocessName = await rows
      .nth(i)               // pick the row
      .locator("td")        // find cells inside that row
      .nth(0)               // first column
      .innerText();
    console.log(chromeprocessName);

    if (chromeprocessName === "Chrome") {
      cpuload = await rows.nth(i).locator("td").filter({ hasText: '%' }).innerText();
      console.log("CPU load percentage:", cpuload);
      break;
    }
  }
  let cpuloadlabeltext: string = await page.locator(`p:has-text("CPU load of Chrome process:")`).innerText();
  console.log("The cpu label text is :", cpuloadlabeltext);

  if (cpuloadlabeltext.match(cpuload)) {
    console.log("CPU load of Chrome is equal");

  } else {
    console.log("CPU load of Chrome is equal");
  }
  expect(cpuloadlabeltext).toContain(cpuload);


  //Memory Size of Firefox process: 63.2 MB
  let Memorysize = '';

    for (let i = 0; i < rowscount; i++) {
    const firefoxprocessName = await rows
      .nth(i)               // pick the row
      .locator("td")        // find cells inside that row
      .nth(0)               // first column
      .innerText();
    console.log(firefoxprocessName);

    if (firefoxprocessName === "Firefox") {
      Memorysize = await rows.nth(i).locator("td").filter({ hasText: 'MB' }).first().innerText();
      console.log("Memorysize load percentage:", Memorysize);
      break;
    }
  }
   let Msizelabeltext: string = await page.locator('p:has-text("Memory Size of Firefox process:")').innerText();
   console.log("Memory size label text is :", Msizelabeltext);
   
   if (Msizelabeltext.match(Memorysize)) {
    console.log("Memorysize of firefox is equal");

  } else {
    console.log("Memorysize of firefox is NOT equal");
  }
  expect(Msizelabeltext).toContain(Memorysize);
    await page.waitForTimeout(3000)
})