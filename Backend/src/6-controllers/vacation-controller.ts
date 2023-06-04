import express, {Request, Response, NextFunction } from "express";
import path from "path";
import fileHendler from "../2-utils/fileHandler";
import { FileNotFoundErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";
import verifyAdmin from "../3-middleware/verify-admin";


const router = express.Router(); 

router.get('/vacations', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const vacations = await vacationLogic.getAllVacations();
        response.json(vacations);    
    } catch (error) {
        next(error)
    }
});

router.get('/vacations/limit/:limit([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const limit = +request.params.limit;
        const vacations = await vacationLogic.getTenVacations(limit);
        response.json(vacations);    
    } catch (error) {
        next(error)
    }
});

router.get('/vacations/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationLogic.getOneVacations(id);
        response.json(vacation);
    } catch (error) {
        next(error)
    }
});

router.get('/vacations/user/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationLogic.getVacationsByUserId(id);
        response.json(vacation);
    } catch (error) {
        next(error)
    }
});

router.post('/vacations', verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body) ;

        const newVacation = await vacationLogic.addVacation(vacation);
        response.status(201).json(newVacation);
    } catch (error) {
        next(error)
    }
});

router.patch('/vacations/:id([0-9]+)', verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {
    try {
        request.body.vacationId = +request.params.id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationLogic.updateVacation(vacation);
        response.json(updatedVacation);
    } catch (error) {
        next(error)
    }
});

router.delete('/vacations/:id([0-9]+)', verifyAdmin, async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        await vacationLogic.deleteVacation(id);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
});

router.get('/vacations/images/:imageName', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        if (!fileHendler.fileExists(imageName)) throw new FileNotFoundErrorModel(imageName)
        const absolutePath = path.join(__dirname, '..', '1-assets', 'images', imageName)
        response.sendFile(absolutePath);
    } catch (error) {
        next(error)
    }
});


export default router;