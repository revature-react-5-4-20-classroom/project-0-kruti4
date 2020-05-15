
import express,{ Router,Request,Response } from "express";
import {getAllUsers, getUserById } from "../services/userService";

// import { authAdminMiddleware, authRoleFactory } from "../middleware/authMiddleware";
export const userRouter: Router= express.Router();



userRouter.get("/", (req: Request, res: Response) => {
    res.json(getAllUsers());
});
userRouter.get("/id", (req: Request, res: Response) => {
    let id=req.body;
    res.json(getUserById(id));
})
userRouter.patch("/", (req: Request, res: Response) => {
 
})

