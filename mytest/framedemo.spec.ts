import { test, expect } from '@playwright/test';

test('Frame Demo', async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");
    //total number of frames present on the page
    const frames = page.frames();
    console.log("number of frames present :", frames.length);

    // Approach 1: using page.frame()
    const frame = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1.html" });
    if (frame) {
        await frame.locator("[name='mytext1']").fill("Frame1testing");
        // await frame.fill("[name='mytext1']","Hello");
    } else {
        console.log("Frame is not available");

    }
    //approach 2 : using frame locator
    await page.frameLocator('[src="frame_1.html"]').locator("[name='mytext1']").fill("Frame3testing");
})


test('Inner Demo', async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");
    const frame3 = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_3.html" });

    if (frame3) {
        await frame3.locator("[name='mytext3']").fill("Welecome");
        const childframes = frame3.childFrames();
        console.log("Total number of child frames in Frame3", childframes.length);

        const [childFrame] = childframes;

        if (childFrame) {
            const radio = childFrame.getByLabel("Hi, I am the UI.Vision IDE2");
            await radio.check();
            await expect(radio).toBeChecked();
        }
         //await page.waitForTimeout(4000);

    } else {
        console.log("Frame three is not available ");

    }



})









