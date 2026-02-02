/*
Test: create booking
Request type: Post
request body: static

*/
import { test, expect, request } from '@playwright/test';
import { log } from 'node:console';


test('create post request using static body', async ({ request }) => {

    const requestBody = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Apple"
    }

    //send post request 
    const response = await request.post("https://restful-booker.herokuapp.com/booking?firstname=Jim&lastname=Broen",
        { data: requestBody });
    const responsebody = await response.json();  //Extracted response
    console.log(responsebody);

    //validate status 
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    //validate response body attributes 
    expect(responsebody).toHaveProperty("bookingid");
    expect(responsebody).toHaveProperty("booking");
    expect(responsebody).toHaveProperty("booking.additionalneeds");

    //Validate booking details 
    const booking=responsebody.booking;


    expect(booking).toMatchObject({
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    additionalneeds: 'Apple'
  });
  //Booking dates cls
expect(booking.bookingdates).toMatchObject
({checkin: '2018-01-01', 
  checkout: '2019-01-01',
 });

})