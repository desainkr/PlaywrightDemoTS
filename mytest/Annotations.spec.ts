import { test, expect } from "@playwright/test";

/*
test.describe-> Groups realted tests
test.skip-Skipdsthe test,skipping a test beacause  it's not relevant in the current version
test.only- Runs only the test,ignoring others,running only this test(usefull for debugging)
test.fixme-Marks a test as expected to faile  Temporarily ignoring a broken test
test.slow-Marks a test as slow ,Running a slow test(e,g,. heavy UI interactions)--Marks test as slow (triples timeout).
test.fail-Marking a known bug as expected to fail

*/
test.describe('Google Search tests', () => {

    test('google homepage should load @Smoke', async ({ page }) => {
        await page.goto("Https://www.google.com");
        await expect(page).toHaveTitle('Google');

    })

    test.skip('google search should work', async ({ page }) => {
        await page.goto("Https://www.google.com");
        await page.locator("input[name='q']").fill("playwright");
        await page.keyboard.press("Enter")
        await expect(page).toHaveTitle(/playwright/)
    })

    test.fixme('check if google logo is visble', async ({ page }) => {
        await page.goto("Https://www.google.com");
        await expect(page.locator("[alt='Black History Month 2026']")).toBeVisible();

    })

    test('google images should load', async ({ page }) => {
        test.slow();
        await page.goto("Https://www.google.com/imghp");
        await expect(page).toHaveTitle(/Google Images/);
    })

    test.fail('google logoshould be visiable(but using an incorrect selector)', async ({ page }) => {
        await page.goto("Https://www.google.com/"); B
        await expect(page.locator("img[alt='wrongGoogleLogo']")).toBeVisible();
    })

    test('Searcj playwright Automation', async ({ page }) => {
        await page.goto("Https://www.google.com");
        await page.locator("input[name='q']").fill("playwright Automation");
        await page.keyboard.press("Enter")
        console.log("Test 1 Execution is completed");
    })

})

/*
est-Level & Suite-Level Annotations in Playwright
🔹 1. test.describe() — Group Tests

Groups related tests.

test.describe('Login flow', () => {
  test('valid login', async ({ page }) => {});
});

🔹 2. test.only() — Run Only This Test / Suite

Runs only that test.

test.only('debug this', async ({ page }) => {});

🔹 3. test.skip() — Skip Test

Skip unconditionally.

test.skip('feature not ready');


Or conditionally:

test.skip(browserName === 'webkit', 'Bug in WebKit');

🔹 4. test.fixme() — Mark Known Broken Test

Like skip, but tracked as TODO.

test.fixme('Flaky due to backend issue');

🔹 5. test.fail() — Expected Failure

Marks test as expected to fail.

test.fail('Bug #12345');

🔹 6. test.slow() — Increase Timeout

Marks test as slow (triples timeout).

test.slow();


Inside test:

test('long flow', async ({ page }) => {
  test.slow();
});

🔹 7. test.describe.only()

Run only this suite.

test.describe.only('Checkout tests', () => {});

🔹 8. test.describe.skip()

Skip entire suite.

test.describe.skip('Mobile only', () => {});

🔹 9. test.describe.parallel()

Run tests inside in parallel.

test.describe.parallel('Parallel suite', () => {});

🔹 10. test.describe.serial()

Run tests sequentially.

test.describe.serial('Sequential suite', () => {});

🔹 11. test.use() — Override Fixtures for Test/Suite

Override browser or options.

test.use({ viewport: { width: 375, height: 667 } });


Inside describe:

test.describe('Mobile', () => {
  test.use({ isMobile: true });
});

🔹 12. test.setTimeout()

Change timeout for a test.

test.setTimeout(60000);

🔹 13. test.beforeAll() / test.afterAll()

Hooks.

test.beforeAll(async () => {});
test.afterAll(async () => {});

🔹 14. test.beforeEach() / test.afterEach()

Hooks.

test.beforeEach(async ({ page }) => {});
test.afterEach(async () => {});

✅ Metadata / Tagging / Annotations
🔹 15. Tags

Used for filtering tests.

test('login works @smoke @regression', async () => {});


Run:

npx playwright test --grep @smoke

🔹 16. test.info().annotations

Add runtime annotations (shows in report).

test('example', async ({}, testInfo) => {
  testInfo.annotations.push({
    type: 'jira',
    description: 'PROJ-1234'
  });
});

🔹 17. test.step() — Logical Reporting Steps
await test.step('Login', async () => {
  await page.fill('#user', 'admin');
});

✅ Retry / Flaky Control
🔹 18. Retries (config)
retries: 2

🔹 19. test.describe.configure()

Configure mode, retries, timeout.

test.describe.configure({
  retries: 2,
  mode: 'parallel'
});

📌 Quick Interview Summary

Most important annotations/modifiers:

test.only

test.skip

test.fixme

test.fail

test.slow

test.describe.parallel

test.describe.serial

test.use

test.step

tags

hooks
*/