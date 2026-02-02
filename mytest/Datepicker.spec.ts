import { test, expect } from '@playwright/test';


test('Handling date picker', async ({ page }) => {
  // ISO format date:YYYY-MM-DD-----<input type="date">
  // await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
  // await page.getByLabel("Date of Birth:").fill("2026-01-28"); 
  // //the underlying <input type="date"> still expects and stores the value in ISO format:YYYY-MM-DD
  // await expect(page.getByLabel("Date of Birth:")).toHaveValue("2026-01-28");

  await page.goto("https://www.globalsqa.com/demo-site/datepicker")
  const iframes = page.frames();
  console.log(`number of frames ${iframes.length}`);
  const parentFrame = page.frameLocator(".demo-frame").first();
  await parentFrame.locator("#datepicker").click();
  // await parentFrame.locator("text='28'").click();
  // await expect(parentFrame.locator("text='28'")).toHaveValue("01/28/2026");
  // await expect(parentFrame.locator("#datepicker")).toHaveValue("01/28/2026");

  const date = new Date();
  //console.log(date);
  const currentDate = date.getDate()
  //console.log(currentDate);
  await parentFrame.locator(`text="${currentDate}"`).click();
  await page.waitForTimeout(5000);

  // 01/28/2026

  const today = new Date();
  const currentday = today.getDate();
  console.log(currentday);
  const currentmonth = today.getMonth() + 1;
  console.log(currentmonth);
  const currentfullyear = today.getFullYear();
  console.log(currentfullyear);

  const formattedDate = `${currentmonth}/${currentday}/${currentfullyear}`;
  const datepickervalue = await parentFrame.locator("#datepicker").inputValue();
  console.log(datepickervalue);

  //convert date to date object to compare  dates
  const expectedDate = new Date(formattedDate);
  const actualDate = new Date(datepickervalue);
  expect(actualDate.getTime()).toBe(expectedDate.getTime());






})

test.only('Handling Future date picker', async ({ page }) => {



  await page.goto("https://www.globalsqa.com/demo-site/datepicker")
  const iframes = page.frames();
  console.log(`number of frames ${iframes.length}`);
  const parentFrame = page.frameLocator(".demo-frame").first();
  await parentFrame.locator("#datepicker").click();

  //Future Date

  const targetYear = 2027;
  const tragetMonth = "March";
  const targetDay = "29";

  while (true) {
    const displayyearText = await parentFrame.locator(".ui-datepicker-year").textContent() || "0"
    // console.log(displayyearText);
    const displayedYear = parseInt(displayyearText);
    // console.log(displayedYear);

    if (displayedYear === targetYear) {
      break;
    }

    if (displayedYear < targetYear) //2026 <2027
    {
      await parentFrame.getByText('Next', { exact: true }).click();

    } else {
      await parentFrame.getByText('Prev', { exact: true }).click()

    }
  }

  while (true) {
    const displayedMonth = await parentFrame.locator(".ui-datepicker-month").textContent();

    if (displayedMonth === tragetMonth) {
      break;
    } else 
      {  
      //await parentFrame.getByText('Next', { exact: true }).click();
      await parentFrame.locator(".ui-datepicker-next").click();

    }

   }

  // ---- Click day AFTER correct month/year reached ----
  await parentFrame.locator(`text="${targetDay}"`).click();

  await page.waitForTimeout(5000);
});







