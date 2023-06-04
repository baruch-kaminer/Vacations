import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/AppConfig";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    console.log(err);

    const status = err.status || 500;

    let message = err.message;
    
    if( appConfig.isProduction && status === 500 ){
        message = 'Error!!!';
    }

    logger(err.message);

    response.status(status).send(message);
    
}
export default catchAll;