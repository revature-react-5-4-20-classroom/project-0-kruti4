
import express, { Router, Request, Response } from "express";
import { getAllUsers, getUserById, updateUser } from "../repository/userData";
import { authRoleFactory } from "../middlewares/authForUsersMiddleware";
import { User } from "../models/User";
export const userRouter: Router = express.Router();
//hanles get requestes for fetching user data by user id
userRouter.get("/:id", async (req: Request, res: Response) => {
    let id = +req.params.id;
    console.log(id);
    if (!req.session || !req.session.user) {
        res.status(401).send('Please login');
    } else {
        try {
            console.log(req.session.user.userId);
            res.json(await getUserById(id, req.session.user.userId, req.session.user.role.role));
        } catch (e) {
            res.status(401).send(e.message);
        }
    }
})

userRouter.use(authRoleFactory(['finance-manager']));
//handles patch request for updating user data
userRouter.patch("/", async (req: Request, res: Response) => {
    //console.log("get patch request");
    try {
        let user: User = req.body;
        res.json(await updateUser(user));
    } catch (e) {
        res.status(401).send(e.message);
    }
})

//handles get request for fetching all users data

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        res.json(await getAllUsers());
    }
    catch (e) {
        res.json(e.message);
    }
});



