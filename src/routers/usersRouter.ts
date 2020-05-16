
import express,{ Router,Request,Response } from "express";
import {getAllUsers} from "../repository/userData";
import { authRoleFactory } from "../middlewares/authenticationMiddleware";

// import { authAdminMiddleware, authRoleFactory } from "../middleware/authMiddleware";
export const userRouter: Router= express.Router();

userRouter.use(authRoleFactory(['admin','finance-manager']));

userRouter.get("/", async (req: Request, res: Response) => {
    res.json(await getAllUsers());
});
// userRouter.get("/id", (req: Request, res: Response) => {
//     let id=req.body;
//     res.json(getUserById(id));
// })
userRouter.patch("/", (req: Request, res: Response) => {
 
})

