import { test, expect, type Page } from "@playwright/test";

async function selectDate(targetYear: String, targetMonth: String, targetDate: String, page: Page, isFuture: boolean) {

    while (true) {
        const currentmonth = await page.locator(".ui-datepicker-month").textContent();
        const currentyear = await page.locator(".ui-datepicker-year").textContent();

        if (currentmonth === targetMonth && currentyear === targetYear) {
            break;
        }
        if (isFuture) {
            await page.getByText('Next', { exact: true }).click(); //future
        } else {
            await page.getByText('Prev', { exact: true }).click(); //Past
        }
    }
    const allDates = await page.locator(".ui-datepicker-calendar td").all();
    for (let date of allDates) {
        const dateText = await date.innerText();

        if (dateText === targetDate) {
            await date.click();
            break;
        }

    }

}

test('Jquery Date Picker Testing', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    //   await page.locator('#datepicker').fill("02/27/2026");
    const dataInput = page.locator('#datepicker');
    await expect(dataInput).toBeVisible();
    await page.locator('#datepicker').click();
    await page.waitForTimeout(2000);
    /*
    // future Tragted date
    const year = '2026';
    const month = 'June';
    const date = '20'
    */
    //past target year
    const year = '2023';
    const month = 'June';
    const date = '20'

    selectDate(year, month, date, page, false);
    const expectedDate = "06/20/2023"
    await page.waitForTimeout(2000);
    await expect(dataInput).toHaveValue(expectedDate);


})