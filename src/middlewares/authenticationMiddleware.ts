import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';

import { unauthorizedError } from '../errors/unauthorized-error.ts';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    const fakeSession = [
        {
            userId: 1,
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxIn0.1ZBc33kR6QU2rjm2rqNe-Lba-qW0NAaXPh2MzKdLl1U',
        }
    ]

    const authHeader = req.header('Authorization');
    if (!authHeader) return generateUnauthorizedResponse(res);

    const token = authHeader.split(' ')[1];
    if (!token) return generateUnauthorizedResponse(res);
    const secret = process.env.JWT_SECRET as string;

    try {
        const { userId } = jwt.verify(token, secret) as JWTPayload;
        const session = fakeSession.find((session)=> session.token === token);
        if (!session) return generateUnauthorizedResponse(res);

        req.userId = userId;

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
