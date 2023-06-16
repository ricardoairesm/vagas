import { fakeSession } from "../../../fakeData.ts";
import jwt from "jsonwebtoken"

export async function createSession() {
    const userId = { userId: 1 }
    const secret = process.env.JWT_SECRET || 'ps_scf_brazil';
    const token = jwt.sign({ userId }, secret);
    fakeSession.push({
        userId: 1,
        token,
    })
}