import { fakeData, fakeCount } from "../../fakeData.ts";

export async function cleanDb() {
    fakeData.forEach(() => {
        fakeData.pop();
    });
    fakeCount.forEach(()=>{
        fakeCount.pop();
    })
}