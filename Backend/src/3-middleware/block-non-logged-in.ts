import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { AuthErrorModel } from "../4-models/error-models";

async function blockNonLoggedIn(request: Request, response: Response, next: NextFunction) {
    try {
        const isValid = await cyber.verifyToken(request);
        if(!isValid) throw new AuthErrorModel("You are not logged in");
        next();
    }
    catch(err: any) {
        next(err);
    }
    
}

export default blockNonLoggedIn;
