/*
Test: create booking
Request type: Post
request body: static

*/
import { test, expect, request } from '@playwright/test';
import { log } from 'node:console';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';



test('create post request using faker body', async ({ request }) => {

  // Data genration using faker 
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const totalprice = faker.number.int({ min: 100, max: 5000 });
  const depositpaid = faker.datatype.boolean();
  const checkin = DateTime.now().toFormat("yyyy-MM-dd");
  const checkout = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

  // read data from json(request body)

  const requestBody = {
    "firstname": firstname,
    "lastname": lastname,
    "totalprice": totalprice,
    "depositpaid": depositpaid,
    "bookingdates": {
      "checkin": checkin,
      "checkout": checkout,
    },
    "additionalneeds": "Apple"
  }


  //send post request 
  const response = await request.post("https://restful-booker.herokuapp.com/booking",
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
  const booking = responsebody.booking;


  expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    additionalneeds: requestBody.additionalneeds
  });
  //Booking dates cls
  expect(booking.bookingdates).toMatchObject
    ({
      checkin: requestBody.bookingdates.checkin,
      checkout: requestBody.bookingdates.checkout
    });

})