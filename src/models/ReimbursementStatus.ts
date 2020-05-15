/*The ReimbursementStatus model is used to track the status of reimbursements. Status possibilities are Pending, Approved,
 or Denied.*/
export class ReimbuesementStatus {
    statusId: number; // primary key
    status: string; // not null, unique

    constructor(statusId: number, status: string) {
        this.statusId = statusId;
        this.status = status;
    }
}
