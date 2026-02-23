import { test as base } from "@playwright/test";

type MyFixture = {

    helloWorld: string,
    GreatDay: string,

}
type workerFixture = {
    cupOfCoffee: string,

}

export const test = base.extend<MyFixture,workerFixture>({

    helloWorld: async ({ }, use) => {

        const myWorld = "Hello world"
        await use(myWorld)
        console.log("Hello Good Bye!");
    },

    GreatDay: async ({ helloWorld }, use) => {
        const myday = helloWorld + ", what a great day!"
        await use(myday)


    },

    cupOfCoffee: [async ({ }, use, workerInfo) => {
        const cup = 'The cup of coffee NO :' + workerInfo.workerIndex
        await use(cup)


    }, { scope: 'worker' }]

})



