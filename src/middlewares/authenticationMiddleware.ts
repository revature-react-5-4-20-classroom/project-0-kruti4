// import { NextFunction ,Request,Response} from "express";
import express,{ Request, Response, NextFunction } from "express";

export function authRoleFactory(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if(!req.session || !req.session.user) {
        res.status(401).send('Please login');
      } else {
        let allowed = false;
        for(let role of roles) {
          if(req.session.user.role === role) {
            allowed = true;
          }
        }
        if(allowed) {
          next();
        } else {
          res.status(403).send(`Not authorized with role: ${req.session.user.role}`);
        }
      }
    }
  }