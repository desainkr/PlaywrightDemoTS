import { test as base, expect, type Page} from "@playwright/test";

type Myfixtures = {

    loggedInPage: Page,
}
 const test = base.extend<Myfixtures>({
   loggedInPage: async ({ page }, use) => {
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
        await page.locator('#input-email').fill('pwtest@gmail.com');
        await page.locator('#input-password').fill('playwright@77');
        await page.locator("input[value='Login']").click();
        /*     use defines:
            Where test execution happens
            When teardown should start
            Everything before await use() = setup
            Everything after = teardown
            If you forget await use() → fixture won’t work.
        */
        await use(page)  // test runs here
        //await page.close(); // teardown
    }
     
})
export {expect}

/*What Is a Custom Fixture?
A fixture in Playwright:
Sets up test state
Provides reusable objects (like page, login session, API client)
Handles setup + teardown automatically
Custom fixture example:
import { test as base } from '@playwright/test';
export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#user', 'admin');
    await page.fill('#pass', '123');
    await page.click('#login');

    await use(page);   // test runs here

    await page.close(); // teardown
  },
});
🎯 Key Attributes / Concepts to Remember

These are the most important ones 👇

1️⃣ use (Most Important)
async ({ page }, use) => { ... }

use defines:

Where test execution happens

When teardown should start

Everything before await use() = setup
Everything after = teardown

If you forget await use() → fixture won’t work.

2️⃣ Scope

Fixtures can be:

test scope (default)

worker scope

Example:

myFixture: [ async ({}, use) => {}, { scope: 'worker' } ]
Scope	Meaning
test	Runs for every test
worker	Runs once per worker

Use worker scope for:

Database setup

Auth token generation

Expensive setup

3️⃣ Auto vs Manual Fixture

Auto fixture:

myFixture: [ async ({}, use) => {}, { auto: true } ]

auto: true means:

It runs automatically

No need to inject into test

Without auto:
You must inject:

test('example', async ({ myFixture }) => {})
4️⃣ Dependency Injection

Fixtures can depend on other fixtures:

loggedInPage: async ({ page, apiClient }, use) => {}

Playwright resolves dependency order automatically.

This is powerful and clean.

5️⃣ Teardown Placement

Teardown always goes AFTER:

await use(value);

Wrong:

await page.close();
await use(page);  ❌

Correct:

await use(page);
await page.close();  ✅
6️⃣ Fixture Naming Convention

Best practice:

Use meaningful names

Avoid overriding built-in fixtures accidentally

Create separate fixture file (fixtures.ts)

Example structure:

tests/
fixtures/
  base.fixture.ts
7️⃣ Type Safety (Important in TS)

Define type:

type MyFixtures = {
  loggedInPage: Page;
};

Then extend:

export const test = base.extend<MyFixtures>({...});

Very important in enterprise projects.

🎯 Senior-Level Things to Remember

✔ Keep fixtures small
✔ Avoid too much logic inside fixture
✔ Avoid nested login logic everywhere
✔ Prefer API login for speed
✔ Use worker scope carefully
✔ Avoid state leakage

💬 Interview-Ready Answer

If asked:

What are key attributes in custom fixture?

Strong answer:

The key attributes are the use function for setup and teardown control, scope to define whether the fixture runs per test or per worker, auto to control automatic execution, and dependency injection for chaining fixtures. Proper teardown placement and type safety are also critical for stable and scalable frameworks.
*/