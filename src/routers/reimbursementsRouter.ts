import express, { Router, Response, Request } from "express";
import { authRoleFactory } from "../middlewares/authForReimbursementMiddleware";
import { getReimbursementByUserId, getReimbursementByStatusId, submitReimbursement, updateReimbursement } from "../repository/reimbursementData";
import Reimbursement from "../models/Reimbursement";

export const reimbursementsRouter: Router = express.Router();

reimbursementsRouter.post('/', async (req: Request, res: Response) => {
    if (!req.session || !req.session.user) {
        res.status(401).send('Please login');
    } else {
        try {
            let re: Reimbursement = req.body;
            res.status(201);
            res.json(await submitReimbursement(re));
        }
        catch (e) {
            res.send(e);
        }
    }
});
reimbursementsRouter.get('/author/userId/:userId', async (req: Request, res: Response) => {
    let id = +req.params.userId;
    console.log(id);
    if (!req.session || !req.session.user) {
        res.status(401).send('Please login');
    } else {
        try {
            console.log(req.session.user.userId);
            res.status(201);
            res.json(await getReimbursementByUserId(id, req.session.user.userId, req.session.user.role.role));
        } catch (e) {
            res.status(401).send(e.message);
        }
    }
});
reimbursementsRouter.use(authRoleFactory(['finance-manager']));

reimbursementsRouter.patch('/', async (req: Request, res: Response) => {
    try {
        let re: Reimbursement = req.body;
        res.status(201);
        res.json(await updateReimbursement(re));
    } catch (e) {
        res.send(e.message);
    }
});

reimbursementsRouter.get('/status/:statusId', async (req: Request, res: Response) => {
    try {
        let id = +req.params.statusId;
        console.log(id);
        res.json(await getReimbursementByStatusId(id));
    } catch (e) {
        res.send(e.message);
    }
});












///put everything in try catch