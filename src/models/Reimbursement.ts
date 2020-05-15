export default class Reimbursement {
    reimbursementId: number;// primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null        resolver: number, // foreign key -> User
    status: number; // foreign ey -> ReimbursementStatus, not null
    type: number;// foreign key -> ReimbursementType

    constructor(reimbursementId: number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, status: number, type: number) {
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateResolved = dateResolved;
        this.dateSubmitted = dateSubmitted;
        this.description = description;
        this.status = status;
        this.type = type;
    }
}