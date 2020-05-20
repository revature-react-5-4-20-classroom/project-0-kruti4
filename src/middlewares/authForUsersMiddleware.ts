import express, { Request, Response, NextFunction } from "express";

export function authRoleFactory(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.user) {
      res.status(401).send('Please login');
    } else {
      let allowed = false;
      for (let role of roles) {
        if (req.session.user.role.role === role) {
          allowed = true;
        }
      }
      if (req.method == "PATCH" && req.session.user.role.role == "admin") {
        allowed = true;
      }
      if (req.method == "PATCH" && req.session.user.role.role != "admin") {
        allowed = false;
      }

      if (allowed) {
        next();
      } else {
        res.status(401).send(`The incoming token has expired`);
      }
    }
  }
}