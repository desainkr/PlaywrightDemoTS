import { test, expect } from '@playwright/test';

test('Extract all links', async ({ page }) => {

    /* await page.goto("https://www.demoblaze.com/");

    // 1. Get a locator for all anchor tags
    const anchorLocator = page.locator('a');
    //console.log(anchorLocator);
    // 2. Resolve the locator to an array of individual locators
    const anchors = await anchorLocator.all();
   // console.log(anchors);
    // 3. Extract the href attribute from each
   const links=Promise.all(
       anchors.map(anchor => anchor.getAttribute('href'))

    )
       console.log(await links); */


    await page.goto('https://www.demoblaze.com/');
    const links = await page.locator('a').evaluateAll(elements =>
        elements
            .map(el => el.getAttribute('href'))
            .filter(href => href)
    );

    console.log(links);


})
/*
The full code
evaluateAll(elements =>
  elements
    .map(el => el.getAttribute('href'))
    .filter(href => href)
)
🧠 Step 1: What is evaluateAll?
page.locator('a').evaluateAll(...)

👉 Playwright:

finds all <a> elements
passes them as an array → elements
runs your function inside the browser (DOM context)

So:

elements

= array of all <a> DOM nodes

🧠 Step 2: .map(...)
.map(el => el.getAttribute('href'))

👉 For each <a> tag:

get its href attribute

Example:

<a href="https://google.com">Google</a>
<a>Empty</a>

Becomes:

[
  "https://google.com",
  null
]
🧠 Step 3: .filter(href => href)

This is the part you asked about 👇

.filter(href => href)

👉 This means:

“Keep only values that are truthy”

🔍 What is “truthy”?

In JavaScript:

Value	Truthy?
"text"	✅
"https://"	✅
null	❌
undefined	❌
*/