import express, {Request, Response, NextFunction } from "express";
import path from "path";
import fileHendler from "../2-utils/fileHandler";
import { FileNotFoundErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";
import verifyAdmin from "../3-middleware/verify-admin";


const router = express.Router(); 

router.get('/', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        // const vacations = await vacationLogic.getAllVacations();
        response.json('../../Frontend/src/index.tsx');    
    } catch (error) {
        next(error)
    }
});



export default router;