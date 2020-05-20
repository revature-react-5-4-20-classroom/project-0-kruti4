import express, { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { findUserByUsernamePassword } from "../repository/userData";
export const loginRouter: Router = express.Router();
loginRouter.post('/', async (req: Request, res: Response) => {

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Please include username and password fields for login');
  } else {
    try {
      const user = await findUserByUsernamePassword(username, password);
      if (req.session) {
        req.session.user = user;
      }

      res.json(user);
    } catch (e) {
      console.log(e.message);
      res.status(400).send('Invalid Credentials');
    }
  }
});