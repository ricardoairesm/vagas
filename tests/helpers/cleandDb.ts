import { fakeData } from "../../fakeData.ts";

export async function cleanDb() {
    fakeData.forEach(() => {
        fakeData.pop();
    })
}