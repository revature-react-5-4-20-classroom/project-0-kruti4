
import express from "express";
import bodyparser from "body-parser";

import { Application, Request, Response } from "express"
import { userRouter } from "./routers/usersRouter";
import { reimbursementsRouter } from "./routers/reimbursementsRouter";

const app: Application = express();
app.use(bodyparser.json());


app.use("/users", userRouter);
app.use("/reimbursements", reimbursementsRouter);

app.listen(3000, () => {
    console.log("started");
});