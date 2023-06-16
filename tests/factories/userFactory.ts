import { fakeData, fakeCount } from "../../fakeData.ts";
import { User } from "@/types/users.ts";

export async function createUser(name: string): Promise<User> {
    const newUser = {
        id: fakeData.length + 1,
        name,
        job: "Dev"
    }
    const newCount = {
        userId: newUser.id,
        timesRead: 0,
    }
    fakeData.push(newUser);
    fakeCount.push(newCount);
    return (newUser);
}


