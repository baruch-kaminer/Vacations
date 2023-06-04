import express, {Request, Response, NextFunction } from "express";
import followLogic from "../5-logic/follow.logic";

const router = express.Router(); 


router.post('/follow', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const follow = request.body;
        const newFollow = await followLogic.followUp(follow);
        response.status(201).json(newFollow);
    } catch (error) {
        next(error)
    }
});

router.delete('/follow/:id([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const id = +request.params.id;
        await followLogic.followDown(id);
        response.sendStatus(204);
    } catch (error) {
        next(error)
    }
});

router.get('/follow', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const FollowsList = await followLogic.getAllFollows();
        response.json(FollowsList);
    } catch (error) {
        next(error)
    }
});

router.get('/follow/:userId([0-9]+)/:vacationId([0-9]+)', async( request: Request, response : Response, next : NextFunction ) => {
    try {
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;
        const FollowsList = await followLogic.getFollowsByIDAndByVacation(userId, vacationId);
        response.json(FollowsList);
    } catch (error) {
        next(error)
    }
});


export default router;