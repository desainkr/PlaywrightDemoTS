import { test, expect, chromium, type Locator, type Page } from '@playwright/test';

test.use(
    {
        channel: 'chrome',
        headless: false
    });

async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {
    {
        while (true) {
            const currentmonth = await page.locator('.ui-datepicker-month').innerText();
            const currentyear = await page.locator('.ui-datepicker-year').innerText();
            if (currentmonth === targetMonth && currentyear === targetYear) {
                break;
            }
            if (isFuture) {
                await page.getByText('Next', { exact: true }).click();  //future
            } else {
                await page.getByText('Prev', { exact: true }).click();//Previous 
            }
        }
        const allDates: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
        for (let dt of allDates) {
            const datetext = await dt.innerText();
            if (datetext === targetDate) {
                await dt.click();
                break;

            }
        }


    }

}

test('Jquery picker test', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const dateinput = page.locator("#datepicker");
    expect(dateinput).toBeVisible();
    await dateinput.click();


    //Approach:1:using fill method
    //await dateinput.fill("01/12/2026"); //mm/dd/yyyy

    //Approach 2
    //select future traget date
    /*const year = '2028';
    const month = 'January';
    const date = '25';
    selectDate(year, month, date, page, true);
    const expectedfutureDate = "01/25/2028";
    await expect(dateinput).toHaveValue(expectedfutureDate);
    await page.waitForTimeout(2000); */
    //select previous date
    const year1 = '2024';
    const month1 = 'January';
    const date1 = '25';
    selectDate(year1, month1, date1, page, false)  // future date -true past date-false.
    const expectedPreviousDate ="01/25/2024";
    await expect(dateinput).toHaveValue(expectedPreviousDate); 
    await page.waitForTimeout(2000);
}
)