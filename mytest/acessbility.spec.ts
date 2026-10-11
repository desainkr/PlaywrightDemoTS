import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('Accessibility acan test1', async ({ page },testInfo) => {
  await page.goto("https://www.demoblaze.com/");

    const results = await new AxeBuilder({ page })
        .withTags(["wcag2a","wcag2aa"])   // withRules([])
        .analyze();
    const critical = results.violations.filter(v => v.impact === 'critical');
     expect(critical.length).toBe(0);

    //console.log("Accessibility Violations:", results.violations);
    // await testInfo.attach("accessibility-scan-results", {
    //   body: JSON.stringify(results.violations, null,3), 
    //   contentType: "application/json",
    })

  //expect(results.violations.length).toBeGreaterThan(0); // or remove this line
});
test.skip('Accessibility acan test2', async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");

  const { violations } = await new AxeBuilder({ page }).analyze();

  if (violations.length > 0) {
    console.log(`Found ${violations.length} accessibility issues`);
    for (const v of violations) {
      console.log(`- ${v.id}: ${v.description}`);
    }
  }

  // Do NOT fail the test
});
