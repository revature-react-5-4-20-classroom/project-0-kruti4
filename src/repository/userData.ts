
import { User } from '../models/User';
import { PoolClient, QueryResult, Pool } from 'pg';
import { connectionPool } from '.';
import Role from '../models/Role';
import { userRouter } from '../routers/usersRouter';

export async function getAllUsers(): Promise<User[]> {
    let client: PoolClient;
    client = await connectionPool.connect();
    try {
        let result: QueryResult;
        result = await client.query(
            `SELECT users.user_id, users.username, users.password,users.firstname,users.lastname, users.email,users.role as role_id, roles.role
      FROM users INNER JOIN roles ON users.role = roles.role_id;`
        );
        // result.rows contains objects that almost match our User objects.  Let's write a map()
        // that finishes the conversion
        return result.rows.map((u) => {
            return new User(u.user_id, u.username, u.password, u.firstname, u.lastname, u.email, new Role(u.role_id, u.role));
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

export async function getUserById(id: number, loggedUserId: number, role: string): Promise<User> {
    let client: PoolClient = await connectionPool.connect();
    try {
        if (id == loggedUserId || role == 'finance-manager') {
            let result: QueryResult = await client.query(
                `SELECT users.user_id, users.username, users.password,users.firstname,users.lastname, users.email,users.role as role_id, roles.role
        FROM users INNER JOIN roles ON users.role = roles.role_id where users.user_id=$1;`, [id]
            );
            console.log(result.rows[0].user_id);

            let uObj = new User(result.rows[0].user_id, result.rows[0].username, result.rows[0].password, result.rows[0].firstname, result.rows[0].lastname, result.rows[0].email, new Role(result.rows[0].role_id, result.rows[0].role))
            console.log(uObj);
            return uObj;
        } else {
            throw new Error('The incoming token has expired')
        }
    } catch (e) {
        throw new Error(`Failed to query for get users by userid: ${e.message}`);
    } finally {
        client && client.release();
    }

}

export async function updateUser(u: User): Promise<User> {

    let client: PoolClient = await connectionPool.connect();
    try {
        if (!u.userId) {
            throw new Error("please provide user id");
        }
        else {
            let oldU: QueryResult = await client.query(
                `select * from users where user_id =$1;`, [u.userId]);
            let uOld = new User(oldU.rows[0].user_id, oldU.rows[0].username, oldU.rows[0].password, oldU.rows[0].firstname, oldU.rows[0].lastname, oldU.rows[0].email, new Role(oldU.rows[0].role, oldU.rows[0].role));
            // Object.keys(uOld).forEach(key => {
            //     console.log(uOld[key])
            //   })
            // for (let [key,ele] of uOld) {
            //     console.log(ele[key]);

            // if(uOld[ele]==undefined || uOld[ele]==null){
            //     uOld[ele]=oldU[ele];
            // }
            // }
            if (u.userName == undefined || u.userName == null) {
                u.userName = uOld.userName;
            }
            if (u.password == undefined || u.password == null) {
                u.password = uOld.password;
            }
            if (u.firstName == undefined || u.firstName == null) {
                u.firstName = uOld.firstName;
            }
            if (u.lastName == undefined || u.lastName == null) {
                u.lastName = uOld.lastName;
            }
            if (u.email == undefined || u.email == null) {
                u.email = uOld.email;
            }
            // if (u.role.role == undefined || u.role.role == null) {
            //     u.role.role = uOld.role.role;
            // }
            if (u.role.roleId == 0 || u.role.roleId == undefined) {
                u.role.roleId = uOld.role.roleId;
                console.log(u.role.roleId);
                
            }
        }
        let result: QueryResult = await client.query(
            `UPDATE users set username=$2,
            password=$3,
            firstname=$4,
            lastname=$5,
            email=$6,
            "role"=$7 where user_id =$1;`, [u.userId,u.userName,u.password,u.firstName,u.lastName,u.email,u.role.roleId]);
        // console.log(result.rows[0].user_id);
        let updatedUser: QueryResult = await client.query(
            `select * from users where user_id =$1;`, [u.userId]);
        let uObj = new User(updatedUser.rows[0].user_id, updatedUser.rows[0].username, updatedUser.rows[0].password, updatedUser.rows[0].firstname, updatedUser.rows[0].lastname, updatedUser.rows[0].email, new Role(updatedUser.rows[0].role_id, updatedUser.rows[0].role));
        console.log(uObj);
        return uObj;

    } catch (e) {
        throw new Error(`Failed to query to update users: ${e.message}`);
    } finally {
        client && client.release();
    }
}

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
    let client: PoolClient = await connectionPool.connect();
    try {
        let result: QueryResult;
        result = await client.query(
            `SELECT users.user_id, users.username, users.password, users.email,users.role as role_id, roles.role 
          FROM users INNER JOIN roles ON users.role = roles.role_id
          WHERE users.username = $1 AND users.password = $2;`, [username, password]
        );
        const usersMatchingUsernamePassword = result.rows.map((u) => {
            return new User(u.user_id, u.username, u.password, u.firstname, u.lastname, u.email, new Role(u.role_id, u.role));
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
