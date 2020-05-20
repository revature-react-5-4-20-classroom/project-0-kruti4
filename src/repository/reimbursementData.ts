import { PoolClient, QueryResult, Pool } from 'pg';
import { connectionPool } from '.';
import Reimbursement from '../models/Reimbursement';

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

export async function getReimbursementByUserId(id: number, uId: number, r: string): Promise<Reimbursement[]> {
    let client: PoolClient = await connectionPool.connect();
    try {
        if (id === uId || r == 'finance-manager') {
            let result: QueryResult = await client.query(
                `SELECT * FROM reimbursement where author=$1 order by date_submitted;`, [id]
            );
            return result.rows.map((o) => {
                return new Reimbursement(o.reimbursement_id, o.author, o.amount, o.date_submitted, o.date_resolved, o.description, o.resolver, o.status, o.type);
            });
        } else {
            throw new Error('The incoming token has expired');
        }
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
            throw new Error("please provide reimbursement id");
        }
        else {
            let oldR: QueryResult = await client.query(
                `select * from reimbursement where reimbursement_id =$1;`, [r.reimbursementId]);
            let rOld = new Reimbursement(oldR.rows[0].reimbursement_id, oldR.rows[0].author, oldR.rows[0].amount, String(oldR.rows[0].date_submitted), String(oldR.rows[0].date_resolved), oldR.rows[0].description, oldR.rows[0].resolver, oldR.rows[0].status, oldR.rows[0].type);
            console.log("khdf" + String(rOld.dateSubmitted));
            if (rO.author == undefined || rO.author == 0) {
                rO.author = rOld.author;
                console.log(rO.author);
            }
            if (rO.amount == undefined || rO.amount == null) {
                rO.amount = rOld.amount;
            }
            if (rO.description == "" || rO.description == null) {
                rO.description = rOld.description;
            }
            if (rO.resolver == undefined || rO.resolver == 0) {
                rO.resolver = rOld.resolver;
            }
            if (rO.status == undefined || rO.status == 0) {
                rO.status = rOld.status;
            }
            if (rO.type == undefined || rO.type == 0) {
                rO.type = rOld.type;
            }
        }
        if (rO.dateSubmitted.length > 6) {
            let result: QueryResult = await client.query(
                `Update reimbursement set date_submitted=$1; where reimbursement_id=$2`, [rO.dateSubmitted, rO.reimbursementId]);
        }
        if (rO.dateResolved.length > 6) {
            let result: QueryResult = await client.query(
                `Update reimbursement set date_resolved=$1; where reimbursement_id=$2`, [rO.dateResolved, rO.reimbursementId]);
        }
        let result: QueryResult = await client.query(
            `UPDATE reimbursement set author=$2,
            amount=$3,
            description=$4,
            resolver=$5,
            "status"=$6 ,
            "type"=$7 where reimbursement_id =$1;`, [rO.reimbursementId, rO.author, rO.amount, rO.description, rO.resolver, rO.status, rO.type]);
        let updatedReimbursement: QueryResult = await client.query(
            `select * from reimbursement where reimbursement_id =$1;`, [r.reimbursementId]);
        let rObj = new Reimbursement(updatedReimbursement.rows[0].reimbursement_id, updatedReimbursement.rows[0].author, updatedReimbursement.rows[0].amount, updatedReimbursement.rows[0].date_submitted, updatedReimbursement.rows[0].date_resolved, updatedReimbursement.rows[0].description, updatedReimbursement.rows[0].resolver, updatedReimbursement.rows[0].status, updatedReimbursement.rows[0].type);
        console.log(rObj);
        return rObj;
    } catch (e) {
        throw new Error(`Failed to query to update reimbursement: ${e.message}`);
    } finally {
        client && client.release();
    }
}

export async function submitReimbursement(rObj: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient = await connectionPool.connect();
    try {
        const result: QueryResult = await client.query(
            `insert into reimbursement values(default,$1,$2,$3,$4,$5,$6,$7,$8);`, [rObj.author, rObj.amount, rObj.dateSubmitted, rObj.dateResolved, rObj.description, rObj.resolver, rObj.status, rObj.type]
        );
        const newReimbursement: QueryResult = await client.query(
            `select * from reimbursement where reimbursement_id = (select max(reimbursement_id) from reimbursement);`);// r2 where r2.author =$1);`, [rObj.author]);
        return newReimbursement.rows.map(
            (r) => { return new Reimbursement(r.reimbursement_id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type) }
        )[0];
    } catch (e) {
        console.log(e);
        throw new Error("Failed to add new Reimbursement" + e);
    } finally {
        client && client.release();
    }
}