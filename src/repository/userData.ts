
import { User } from '../models/User';
import { PoolClient, QueryResult } from 'pg';
import { connectionPool } from '.';
import Role from '../models/Role';

export async function getAllUsers(): Promise<User[]> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        let result: QueryResult;
        result = await client.query(
            `SELECT users.user_id, users.username, users.password,users.firstname,users.lastname, users.email, roles.role
      FROM users INNER JOIN roles ON users.role = roles.role_id;`
        );
        // result.rows contains objects that almost match our User objects.  Let's write a map()
        // that finishes the conversion
        for (let row of result.rows) {
            console.log(row.username);
        }
        return result.rows.map((u) => {
            return new User(u.user_id, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
        });
    } catch (e) {
        throw new Error(`Failed to query for all users: ${e.message}`);
    } finally {
        //as a reminder, finally always runs, regardless of success or failure.
        // One of the main uses of finally is to "clean up" whatever you were doing in try{}.
        // In our case, that means releasing our connection back into the pool:
        client && client.release();
    }
}

// export function getUserById(id: number): User {
//     return //users.filter((user) => { return user.id === id; })[0];
// }

// export async function addNewUser(user: User): Promise<User> {
//     //     let client: PoolClient = await connectionPool.connect();
//     //     try {
//     //         // We need to send another query to get the appropriate role_id for the user's role.
//     //         const roleIdResult: QueryResult = await client.query(
//     //             `SELECT * FROM roles WHERE roles.role_name = $1`, [user.role]
//     //         );
//     //         // Get the id we need from that query result
//     //         const roleId = roleIdResult.rows[0].id;

//     //         // Actually add the user, with appropriate role_id
//     //         let insertUserResult: QueryResult = await client.query(
//     //             `INSERT INTO users (username, "password", email, role_id) VALUES
//     //       ($1, $2, $3, $4);`, [user.username, user.password, user.email, roleId]
//     //         )

//     //         // Since we're returning the user, pull our newly created user back out of the db:
//     //         let result: QueryResult = await client.query(
//     //             `SELECT users.id, users.username, users.password, users.email, roles.role_name
//     //       FROM users INNER JOIN roles ON users.role_id = roles.id
//     //       WHERE users.username = $1;`, [user.username]
//     //         );

//     //         return result.rows.map(
//     //             (u) => { return new User(u.id, u.username, u.password, u.email, u.role_name) }
//     //         )[0];
//     //     } catch (e) {
//     //         throw new Error(`Failed to add user to DB: ${e.message}`);
//     //     } finally {
//     //         client && client.release();
//     //     }
//     return []
// }

export async function findUserByUsernamePassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        let result: QueryResult;
        result = await client.query(
            `SELECT users.user_id, users.username, users.password, users.email, roles.role
          FROM users INNER JOIN roles ON users.role = roles.role_id
          WHERE users.username = $1 AND users.password = $2;`, [username, password]
        );
        const usersMatchingUsernamePassword = result.rows.map((u) => {
            return new User(u.user_id, u.username, u.password, u.firstname, u.lastname, u.email, u.role);
        })
        if (usersMatchingUsernamePassword.length > 0) {
            return usersMatchingUsernamePassword[0];
        } else {
            throw new Error('Username and Password not matched to a valid user');
        }
    } catch (e) {
        throw new Error(`Failed to validate User with DB: ${e.message}`);
    } finally {
        client && client.release();
    }
}
