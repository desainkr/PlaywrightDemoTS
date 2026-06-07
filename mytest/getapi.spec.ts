import { test, expect, request } from '@playwright/test';

test('Get api test', async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/booking");

    //console.log(response);
    const responseheaders = response.headers();
    //console.log(response.statusText());
   // console.log(await response.json());
    const responsejson = await response.json();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(response.ok()).toBeTruthy();
    //expect(responsejson).toHaveProperty("bookingid",3034);
    //console.log(responsejson);
    
    //console.log(responseheaders);
    const responseheadersArray = response.headersArray();
    //console.log(responseheadersArray);
})