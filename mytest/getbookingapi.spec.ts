import { test, expect, request } from '@playwright/test';
import { ok } from 'node:assert';
import { log } from 'node:console';


test('get api BookingIDs by path param testes', async ({ request }) => {
  const bookingId=5747;  // we can this as path parameter 
    //sending get request along with path parameter 
    const getResponse = await request.get(`/booking/ ${bookingId}`);
    //console.log(getResponse);
    const getresponsebody = await getResponse.json();
    console.log(getresponsebody);
    //console.log(getResponse.headers());
    // console.log(getResponse.headersArray());
     // Add assertions
    expect(getResponse.status()).toBe(200);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.statusText()).toBe("OK");
    //expect(getResponse.headers).toBe("OK");

    expect(getresponsebody).toHaveProperty("firstname");
   expect(getresponsebody).toHaveProperty("lastname");
   expect(getresponsebody).toHaveProperty("totalprice");
    
   



})

test.only('get api Booking details by name -query params', async ({ request }) => {
  const firstname="Jim";
  const lastname="Brown";  // we can this as query parameter 
    //sending get request along with path parameter 
    const getResponse = await request.get("/booking",{
                                              params:
                                                   {
                                                    firstname,
                                                    lastname
                                                   }
                                                });
    //console.log(getResponse);
    const getresponsebody = await getResponse.json();
    console.log(getresponsebody);
     // Add assertions
    expect(getResponse.status()).toBe(200);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.statusText()).toBe("OK");
    //expect(getResponse.headers).toBe("OK");


      //Check response should not be empty 
    expect(getresponsebody.length).toBeGreaterThan(0);
   for(const item of getresponsebody ){
           expect(item).toHaveProperty('bookingid');
           expect(typeof item.bookingid).toBe("number")
           expect(item.bookingid).toBeGreaterThan(0);
   }
    
})