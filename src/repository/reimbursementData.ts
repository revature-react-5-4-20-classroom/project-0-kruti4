
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

export async function getReimbursementById(id: number): Promise<Reimbursement> {
    let client: PoolClient = await connectionPool.connect();
    try {
        let result: QueryResult = await client.query(
            `SELECT * FROM reimbursement where reimbursement_id=$1;`, [id]
        );
        let o = result.rows[0];
        console.log(("inside get rem by id"));
        console.log(o);
        console.log(new Reimbursement(o.reimbursement_id, o.author, o.amount, o.dateSubmitted, o.dateResolved, o.description, o.resolver, o.status, o.type));

        return new Reimbursement(o.reimbursement_id, o.author, o.amount, o.dateSubmitted, o.dateResolved, o.description, o.resolver, o.status, o.type);

    } catch (e) {
        throw new Error(`Failed to query for all reimbursement: ${e}`);
    } finally {
        client && client.release();
    }
}

export async function getReimbursementByUserId(id: number): Promise<Reimbursement> {
    let client: PoolClient = await connectionPool.connect();
    try {
        let result: QueryResult = await client.query(
            `SELECT * FROM reimbursement where author=$1;`, [id]
        );
        let o = result.rows[0];
        console.log(("inside get rem by user id"));
        console.log(o);
        console.log(new Reimbursement(o.reimbursement_id, o.author, o.amount, o.dateSubmitted, o.dateResolved, o.description, o.resolver, o.status, o.type));

        return new Reimbursement(o.reimbursement_id, o.author, o.amount, o.dateSubmitted, o.dateResolved, o.description, o.resolver, o.status, o.type);

    } catch (e) {
        throw new Error(`Failed to query for all reimbursement: ${e}`);
    } finally {
        client && client.release();
    }
}

// export async function updateUser(u: User): Promise<User> {
//     let client: PoolClient = await connectionPool.connect();
//     try{

//         let result:QueryResult= await client.query(
// `UPDATE user set  where user.user_id =$1;`,[u.userId]
//         )
//     }
//     return ;
// }

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

// export async function findUserByUsernamePassword(username: string, password: string): Promise<User> {
//     let client: PoolClient = await connectionPool.connect();
//     try {
//         let result: QueryResult;
//         result = await client.query(
//             `SELECT users.user_id, users.username, users.password, users.email,users.role as role_id, roles.role 
//           FROM users INNER JOIN roles ON users.role = roles.role_id
//           WHERE users.username = $1 AND users.password = $2;`, [username, password]
//         );
//         const usersMatchingUsernamePassword = result.rows.map((u) => {
//             return new User(u.user_id, u.username, u.password, u.firstname, u.lastname, u.email, new Role(u.role_id, u.role));
//         })
//         if (usersMatchingUsernamePassword.length > 0) {
//             return usersMatchingUsernamePassword[0];
//         } else {
//             throw new Error('Username and Password not matched to a valid user');
//         }
//     } catch (e) {
//         throw new Error(`Failed to validate User with DB: ${e.message}`);
//     } finally {
//         client && client.release();
//     }
// }
