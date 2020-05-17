import express,{ Router,Response,Request } from "express";
import { authRoleFactory } from "../middlewares/authenticationMiddleware";
import { getReimbursementById, getReimbursementByUserId } from "../repository/reimbursementData";

export const reimbursementsRouter: Router= express.Router();

reimbursementsRouter.post('/',(req:Request ,res:Response)=>{

});
reimbursementsRouter.use(authRoleFactory(['finance-manager']));

reimbursementsRouter.patch('/',(req:Request ,res:Response)=>{

});


reimbursementsRouter.get('/status/:statusId', async (req:Request ,res:Response)=>{
    let id=+req.params.statusId;
    console.log(id);
    
    res.json(await getReimbursementById(id));
});

/*L /reimbursements/author/userId/:userId
For a challenge you could do this instead:
/reimbursements/author/userId/:userId/date-submitted?start=:startDate&end=:endDate*/

reimbursementsRouter.get('/author/userId/:userId',async (req:Request,res:Response)=>{
    let uid=+req.params.userId;
    res.json(await getReimbursementByUserId(uid))
});