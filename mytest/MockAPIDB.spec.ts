 import {test,expect} from '@playwright/test';

 //https://restful-booker.herokuapp.com/booking/398
/*
Full flow (visual)
1. page.route → intercept API
2. route.fulfill → send fake data
3. page.goto → trigger API
4. res.json() → convert to object
5. expect → validate
*/

 test('DB mocking API test', async ({page})=>{
// ✅ Step 1: Mock API
await page.route('**/booking/500',async route=>{ //Intercepts any request matching: .../booking/500

    await route.fulfill({             //Instead of real API → send fake response
        status:200,
        contentType: 'application/json',
        body: JSON.stringify({                    //Convert JavaScript object → string
            users:[
                {id:1,name:'Mock User'}
            ]
        })
    })
})



  // ✅ Step 2: Trigger API
const res = await page.goto('https://restful-booker.herokuapp.com/booking/500');
/*👉 This:
opens URL in browser
triggers API call
gets response
*/

//safety check
expect(res).not.toBeNull();  //Ensures: response exists

const data= await res!.json();  //Converts response → JS object
/*
What is res!?
👉 TypeScript syntax:
“I am sure this is NOT null”
*/

console.log(data);   // ✅ see mocked response

// ✅ Step 3: Validate
  expect(data.users[0].name).toBe('Mock User');

});