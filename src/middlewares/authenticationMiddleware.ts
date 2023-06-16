import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { fakeSession } from '../../fakeData.ts'

import { unauthorizedError } from '../errors/unauthorized-error.ts';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {



    const authHeader = req.header('Authorization');
    if (!authHeader) return generateUnauthorizedResponse(res);

    const token = authHeader.split(' ')[1];
    if (!token) return generateUnauthorizedResponse(res);
    const secret = process.env.JWT_SECRET || 'ps_scf_brazil' as string;

    try {
        const verify = jwt.verify(token, secret);
        const session = fakeSession.find((session) => session.token === token);
        if (!session) return generateUnauthorizedResponse(res);
        return next();
    } catch (err) {
        return generateUnauthorizedResponse(res);
    }
}

function generateUnauthorizedResponse(res: Response) {
    res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};
