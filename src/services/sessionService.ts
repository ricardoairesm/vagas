import { createSession } from "../repositories/auth-repository/index.ts";

export async function login(){
    const session = await createSession();
    return session;
}