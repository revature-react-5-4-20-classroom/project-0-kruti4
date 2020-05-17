
import express from "express";
import bodyparser from "body-parser";

import { Application, Request, Response } from "express"
import { userRouter } from "./routers/usersRouter";
import { reimbursementsRouter } from "./routers/reimbursementsRouter";
import { QueryResult, PoolClient } from "pg";
import { connectionPool } from "./repository";
// import { loggingMiddleware } from "./middlewares/loginMiddleware";
import { sessionMiddleware } from "./middlewares/sessionMiddleware";
import { loginRouter } from "./routers/loginRouter";

const app: Application = express();
app.use(bodyparser.json());

app.use(sessionMiddleware);
// app.use(loggingMiddleware);
 
app.use("/login",loginRouter);
app.use("/users", userRouter);
app.use("/reimbursements", reimbursementsRouter);

app.listen(3000, () => {
    console.log("started");
    connectionPool.connect().then(() => {
        console.log("connected");
        // (client: PoolClient) => {
        //     console.log('connected');
        //     // try to query tracks
        //     // client.query returns a Promise of a query result
        //     client.query('SELECT * FROM books;').then(
        //         (result: QueryResult) => {
        //             console.log(result.rows[0]);
        //         }
        //     )
    }).catch((err) => {
        console.log("inside .catch()")
        console.error(err);
    })
});
