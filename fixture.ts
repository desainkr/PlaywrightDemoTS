import { test as base } from '@playwright/test';
import { log } from 'console';

type MyFixture = {

    helloWorld: string;
    greatDay:string;
}

type WorkerFixture={

     cupOfCoffee:string;
}
export const test = base.extend<MyFixture,WorkerFixture>({

    helloWorld: async ({ }, use) => {
        const myWorld = "Hello World";
        await use(myWorld);
        console.log('Good Bye!')

    },

    greatDay: async ({helloWorld}, use) => {

        const myDay = helloWorld + ".What a great day!"
        //await page.goto("https:google.com")
        // await request.get("")
        await use(myDay)
    },

    cupOfCoffee: [async({},use, workerInfo)=>
    {
        const cup= 'The cup of coffee No:' + workerInfo.workerIndex
        await use(cup);

    },{scope: 'worker'}]


})