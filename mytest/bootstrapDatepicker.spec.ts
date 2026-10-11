import { test, expect } from "@playwright/test";


test('Booking.com Date picker testing', async ({ page }) => {

    await page.goto("https://www.booking.com/", {
        waitUntil: "domcontentloaded"
    });

    // Wait up to 5 seconds for popup to appear
    const dialog = page.getByRole('dialog');
    try {
        await dialog.waitFor({ state: 'visible', timeout: 5000 });
        await page.keyboard.press('Escape');
    } catch {
        // Popup did not appear → continue
    }

    // Now click calendar
    await page.getByTestId('searchbox-dates-container').click();;

    //=====Check-In date Selection ========
    let checkinYear = '2026';
    let checkinMonth = 'June';
    let checkinDay = '20'

    while (true) {

        const checkMonthYear = (await page.locator("h3[aria-live='polite']").nth(0).innerHTML()).trim();
        const currentMonth = checkMonthYear.split(/\s+/)[0]; //checkMonthYear.split(" "); ["March", "2026"]
        const currentYear = checkMonthYear.split(/\s+/)[1];
        if (currentMonth === checkinMonth && checkinYear === currentYear) {
            break;
        } else {
            await page.locator("[aria-label='Next month']").click();
        }

    }

    await page.waitForTimeout(3000);

    //select specific check-in date 

    let alldates = await page.locator("[role='grid'] tbody").nth(0).locator('td').all();
    let checkinDateSelected = false;

    for (const date of alldates) {

        const dateText = await date.innerText();

        if (dateText === checkinDay) {
            await date.click();
            checkinDateSelected = true;
            break;

        }


    }

    //Assertion to confirm check-out date was selected


    expect(checkinDateSelected).toBeTruthy();

    await page.waitForTimeout(2000) //Just to visually observe the result during test run(optional)

    //====== Checkout Date Selection =====

    let checkoutYear = '2026';
    let checkoutMonth = 'July';
    let checkoutDay = '30'

    while (true) {

        const checkoutMonthYear = await page.locator("h3[aria-live='polite']").nth(1).innerHTML();
        const currentMonth = checkoutMonthYear.split(" ")[0];
        const currentYear = checkoutMonthYear.split(" ")[1];
        if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
            break;
        } else {
            await page.locator("[aria-label='Next month']").click();
        }

    }

    await page.waitForTimeout(3000);

    //select specific check-in date 

    let allCheckoutDates = await page.locator("[role='grid'] tbody").nth(1).locator('td').all();
    let checkoutDateSelected = false;

    for (const checkout of allCheckoutDates) {

        const checkoutdateText = await checkout.innerText();

        if (checkoutdateText === checkoutDay) {
            await checkout.click();
            checkoutDateSelected = true;
            break;

        }
    }

    //Assertion to confirm check-out date was selected


    expect(checkoutDateSelected).toBeTruthy();

    await page.waitForTimeout(5000) //Just to visually observe the result during test run(optional)



})