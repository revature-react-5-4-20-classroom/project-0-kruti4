
import { User } from '../models/User';
import { PoolClient, QueryResult, Pool } from 'pg';
import { connectionPool } from '.';
import Reimbursement from '../models/Reimbursement';

// export async function getAllUsers(): Promise<Reimbursement[]> {
//     let client: PoolClient;
//     client = await connectionPool.connect();
//     try {
//         let result: QueryResult;
//         result = await client.query(
//             `SELECT users.user_id, users.username, users.password,users.firstname,users.lastname, users.email,users.role as role_id, roles.role
//       FROM users INNER JOIN roles ON users.role = roles.role_id;`
//         );
//         // result.rows contains objects that almost match our User objects.  Let's write a map()
//         // that finishes the conversion
//         return result.rows.map((u) => {
//             return new User(u.user_id, u.username, u.password, u.firstname, u.lastname, u.email, new Role(u.role_id, u.role));
//         });
//     } catch (e) {
//         throw new Error(`Failed to query for all users: ${e.message}`);
//     } finally {
//         //as a reminder, finally always runs, regardless of success or failure.
//         // One of the main uses of finally is to "clean up" whatever you were doing in try{}.
//         // In our case, that means releasing our connection back into the pool:
//         client && client.release();
//     }
// }

export async function getReimbursementByStatusId(id: number): Promise<Reimbursement[]> {
    let client: PoolClient = await connectionPool.connect();
    try {
        let result: QueryResult = await client.query(
            `SELECT * FROM reimbursement where status=$1 order by date_submitted;`, [id]
        );
        return result.rows.map((o) => {
            return new Reimbursement(o.reimbursement_id, o.author, o.amount, o.date_submitted, o.date_resolved, o.description, o.resolver, o.status, o.type);
        });
    } catch (e) {
        throw new Error(`Failed to query for all reimbursement: ${e}`);
    } finally {
        client && client.release();
    }
}

export async function getReimbursementByUserId(id: number): Promise<Reimbursement[]> {
    let client: PoolClient = await connectionPool.connect();
    try {
        let result: QueryResult = await client.query(
            `SELECT * FROM reimbursement where author=$1 order by date_submitted;`, [id]
        );
        // let o = result.rows[0];
        // console.log(("inside get rem by user id"));
        // console.log(o);
        // console.log(new Reimbursement(o.reimbursement_id, o.author, o.amount, o.dateSubmitted, o.dateResolved, o.description, o.resolver, o.status, o.type));
        return result.rows.map((o) => {
            return new Reimbursement(o.reimbursement_id, o.author, o.amount, o.date_submitted, o.date_resolved, o.description, o.resolver, o.status, o.type);
        });
        //        return new Reimbursement(o.reimbursement_id, o.author, o.amount, o.dateSubmitted, o.dateResolved, o.description, o.resolver, o.status, o.type);

    } catch (e) {
        throw new Error(`Failed to query for all reimbursement: ${e}`);
    } finally {
        client && client.release();
    }
}

export async function updateReimbursement(r: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient = await connectionPool.connect();
    try {
        let rO: Reimbursement = r;
        if (!r.reimbursementId) {
            throw new Error("please provide user id");
        }
        
        else {
            let oldR: QueryResult = await client.query(
                `select * from reimbursement where reimbursement_id =$1;`, [r.reimbursementId]);
            let rOld = new Reimbursement(oldR.rows[0].reimbursement_id, oldR.rows[0].author, oldR.rows[0].amount, oldR.rows[0].date_submitted, oldR.rows[0].date_resolved, oldR.rows[0].description, oldR.rows[0].resolver, oldR.rows[0].status, oldR.rows[0].type);
            // let ele;
            // for (ele in rO) {
            //     if(rO[ele]==undefined || rO[ele]==null){
            //         rO[ele]=rOld[ele];
            //     }
            // }
            if (rO.author == undefined || rO.author == null) {
                rO.author = rOld.author;
            }
            if (rO.amount == undefined || rO.amount == null) {
                rO.amount = rOld.amount;
            }
            if (rO.dateSubmitted == undefined || rO.dateSubmitted == null) {
                rO.dateSubmitted = rOld.dateSubmitted;
            }
            if (rO.dateResolved == undefined || rO.dateResolved == null) {
                rO.dateResolved = rOld.dateResolved;
            }
            if (rO.description == undefined || rO.author == null) {
                rO.author = rOld.author;
            }
            if (rO.author == undefined || rO.author == null) {
                rO.author = rOld.author;
            }
            if (rO.author == undefined || rO.author == null) {
                rO.author = rOld.author;
            }
            if (rO.author == undefined || rO.author == null) {
                rO.author = rOld.author;
            }
        }


        let result: QueryResult = await client.query(
            `UPDATE reimbursement set author=$2  where reimbursement_id =$1;`, [r.reimbursementId,rO.author]);
        // console.log(result.rows[0].user_id);
        let updatedReimbursement: QueryResult = await client.query(
            `select * from reimbursement where reimbursement_id =$1;`, [r.reimbursementId]);
        let rObj = new Reimbursement(updatedReimbursement.rows[0].reimbursement_id, updatedReimbursement.rows[0].author, updatedReimbursement.rows[0].amount, updatedReimbursement.rows[0].date_submitted, updatedReimbursement.rows[0].date_resolved, updatedReimbursement.rows[0].description, updatedReimbursement.rows[0].resolver, updatedReimbursement.rows[0].status, updatedReimbursement.rows[0].type);
        console.log(rObj);
        return r;

    } catch (e) {
        throw new Error(`Failed to query to update users: ${e.message}`);
    } finally {
        client && client.release();
    }

}

// // export async function addNewUser(user: User): Promise<User> {
// //     //     let client: PoolClient = await connectionPool.connect();
// //     //     try {
// //     //         // We need to send another query to get the appropriate role_id for the user's role.
// //     //         const roleIdResult: QueryResult = await client.query(
// //     //             `SELECT * FROM roles WHERE roles.role_name = $1`, [user.role]
// //     //         );
// //     //         // Get the id we need from that query result
// //     //         const roleId = roleIdResult.rows[0].id;

// //     //         // Actually add the user, with appropriate role_id
// //     //         let insertUserResult: QueryResult = await client.query(
// //     //             `INSERT INTO users (username, "password", email, role_id) VALUES
// //     //       ($1, $2, $3, $4);`, [user.username, user.password, user.email, roleId]
// //     //         )

// //     //         // Since we're returning the user, pull our newly created user back out of the db:
// //     //         let result: QueryResult = await client.query(
// //     //             `SELECT users.id, users.username, users.password, users.email, roles.role_name
// //     //       FROM users INNER JOIN roles ON users.role_id = roles.id
// //     //       WHERE users.username = $1;`, [user.username]
// //     //         );
// //     //         return result.rows.map(
// //     //             (u) => { return new User(u.id, u.username, u.password, u.email, u.role_name) }
// //     //         )[0];
// //     //     } catch (e) {
// //     //         throw new Error(`Failed to add user to DB: ${e.message}`);
// //     //     } finally {
// //     //         client && client.release();
// //     //     }
// //     return []
// // }




export async function submitReimbursement(rObj: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient = await connectionPool.connect();
    try {
        const result: QueryResult = await client.query(
            `insert into reimbursement values(default,$1,$2,$3,$4,$5,$6,$7,$8);`, [rObj.author, rObj.amount, rObj.dateSubmitted, rObj.dateResolved, rObj.description, rObj.resolver, rObj.status, rObj.type]
        );
        const newReimbursement: QueryResult = await client.query(
            `select * from reimbursement where reimbursement_id = (select max(reimbursement_id) from reimbursement;`);// r2 where r2.author =$1);`, [rObj.author]);
        return newReimbursement.rows.map(
            (r) => { return new Reimbursement(r.reimbursement_id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type) }
        )[0];

    } catch (e) {
        throw new Error("Failed to add new Reimbursement" + e);
    } finally {
        client && client.release();
    }


}