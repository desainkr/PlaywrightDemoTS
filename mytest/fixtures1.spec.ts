import { test } from "./fixturestest1.js"


// test.beforeEach('Hello', async ({ }) => {
//      console.log("Hello world");

// })

test('Where is my candy', async ({helloWorld,cupOfCoffee}) => {
     console.log(helloWorld);
     console.log(cupOfCoffee);
     console.log("Where is my candy");

})

test('I am alive', async ({GreatDay,cupOfCoffee}) => {
     console.log(GreatDay);
     console.log(cupOfCoffee);
     console.log("I'm alive");

})

