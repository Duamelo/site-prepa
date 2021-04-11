import { NextFunction, Response } from "express";
import RequestWithUser from "interfaces/requestWithUser.interface";

async function isAdmin(request: RequestWithUser, response: Response, next: NextFunction){
    if (request.user.role.nom_role==="admin") {
        next()
    }else{
        
    }
}