import express,{ Router,Response,Request } from "express";

export const reimbursementsRouter: Router= express.Router();

reimbursementsRouter.post('/',(req:Request ,res:Response)=>{

});

reimbursementsRouter.patch('/',(req:Request ,res:Response)=>{

});


reimbursementsRouter.get('/status/:statusId',(req:Request ,res:Response)=>{

});

/*L /reimbursements/author/userId/:userId
For a challenge you could do this instead:
/reimbursements/author/userId/:userId/date-submitted?start=:startDate&end=:endDate*/

reimbursementsRouter.get('/author/userId/:userId',(req:Request,res:Response)=>{

});