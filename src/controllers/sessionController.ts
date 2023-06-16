import { NextFunction, Request, Response } from "express";
import { login } from "../services/sessionService.ts";
import { fakeSession } from "../../fakeData.ts";

export async function sessionController(req:Request,res:Response,next:NextFunction){
    try{
       const newLogin = login();
       return  res.send(fakeSession).status(200);
    }catch(error){
        res.send(error);
    }
}