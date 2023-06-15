import userService from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { User, UserInput } from "../types/users";
import httpStatus from 'http-status'
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";

export async function getUserByName(req: Request, res: Response, next: NextFunction) {
    const name = req.query.name as string;
    try {
        const user = await userService.findUserByName(name);
        return res.status(httpStatus.OK).send(user);
    } catch (error) {
        next(error);
    }
};

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.findAllUsers();
        return res.status(httpStatus.OK).send(users);
    } catch (error) {
        next(error);
    }
};

export async function postUser(req: Request, res: Response, next: NextFunction) {
    const user: UserInput = {
        name: req.body.name,
        job: req.body.job,
    }
    try {
        const newUser = await userService.createUser(user);
        return res.status(httpStatus.OK).send(newUser);
    } catch (error) {
        next(error);
    }
};

export async function deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const name = req.query.name as string;
    try {
        const user = await userService.findUserByName(name);
        const deletedUser = await userService.deleteUserFromDb(user);
        return res.status(httpStatus.OK).send(deletedUser);
    } catch (error) {
        next(error);
    }
};

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string;
    const updatedUserInformation = {...req.body,
    id:Number(id),
    };
    try {
        const updatedUser = await userService.updateUserInformation(updatedUserInformation)
        return res.status(httpStatus.OK).send(updatedUser);
    } catch (error) {
        next(error);
    }
};

