import express, { Router, Response, Request } from "express";
import { authRoleFactory } from "../middlewares/authenticationMiddleware";
import { getReimbursementByUserId, getReimbursementByStatusId, submitReimbursement, updateReimbursement } from "../repository/reimbursementData";
import Reimbursement from "../models/Reimbursement";

export const reimbursementsRouter: Router = express.Router();

reimbursementsRouter.post('/', async (req: Request, res: Response) => {
    try {
        let re: Reimbursement = req.body;
        res.status(201);
        res.json(await submitReimbursement(re))
    }
    catch (e) {
        res.send(e.message);
    }
});
reimbursementsRouter.use(authRoleFactory(['finance-manager']));

reimbursementsRouter.patch('/', async (req: Request, res: Response) => {
    try {
        let re: Reimbursement = req.body;
        res.status(201);
        res.json(await updateReimbursement(re));
    }catch(e){
        res.send(e.message);
    }
});


reimbursementsRouter.get('/status/:statusId', async (req: Request, res: Response) => {
    let id = +req.params.statusId;
    console.log(id);

    res.json(await getReimbursementByStatusId(id));
});

/*L /reimbursements/author/userId/:userId
For a challenge you could do this instead:
/reimbursements/author/userId/:userId/date-submitted?start=:startDate&end=:endDate*/

reimbursementsRouter.get('/author/userId/:userId', async (req: Request, res: Response) => {
    let uid = +req.params.userId;
    res.json(await getReimbursementByUserId(uid))
});












///put everything in try catch