import { test, expect, chromium } from '@playwright/test';


test('Read data from all the table pages', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorepages = true;

    while (hasmorepages) {
        const rows = await page.locator("table[id='example'] tbody tr").all();
        //console.log(rows.length);
        for (let row of rows) {
            console.log(await row.innerText());
        }
        await page.waitForTimeout(2000);
        const nextButton = page.getByText('›', { exact: true });

        const isDisabled = await nextButton.getAttribute('class');// dt-paging-button disabled next

        if (isDisabled?.includes('disabled')) {
            hasmorepages = false;
        } else {
            await nextButton.click();
        }
    }

})

test('filter the rows and check the rows count', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown = page.locator("#dt-length-0");
    await dropdown.selectOption({ value: "50" });
    //appraoch1
    const rows = await page.locator("table[id='example'] tbody tr").all();
    expect(rows.length).toBe(50);  //assertion

    //appraoch2
    const rows2 = page.locator("table[id='example'] tbody tr");
    await expect(rows2).toHaveCount(50);  //assertion


})
test.only('Search for specificdata in atable', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchbox = page.getByRole('searchbox', { name: 'Search:' });
    await searchbox.fill('Tiger Nixon');
    await page.waitForTimeout(5000);
    const rows = await page.locator("table[id='example'] tbody tr").all();

    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            const text = await row.innerText();
            if (text.includes('Tiger Nixon')) {
                console.log("record exist - found");
                matchFound = true;
                break;

            }

        }
     //expect(matchFound).toBe(true);
     expect(matchFound).toBeTruthy();

    } else {
        console.log("No rows found with search text");

    }
})
