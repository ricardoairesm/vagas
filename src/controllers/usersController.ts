import userService from "../services/userService.ts";
import { NextFunction, Request, Response } from "express";
import { User, UserInput } from "../types/users.ts";
import httpStatus from 'http-status'
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware.ts";

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

export async function updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const id = Number(req.query.id) as number;
    const updatedUserInformation = {
    id:id,
    name:req.body.name,
    job:req.body.job,
    };
    try {
        const updatedUser = await userService.updateUserInformation(updatedUserInformation);
        return res.status(httpStatus.OK).send(updatedUser);
    } catch (error) {
        next(error);
    }
};

export async function getUserTimesReadCount(req:Request,res:Response,next:NextFunction){
    const name = req.query.name as string;
    try{
        const timesRead = await userService.returnTimesReadByName(name);
        return res.status(httpStatus.OK).send(timesRead);
    }catch(error){
        next(error);
    }
}

