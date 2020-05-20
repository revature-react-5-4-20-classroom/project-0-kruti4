//role class to store role table data in to object
export default class Role {
    roleId: number; // primary key
    role: string; // not null, unique

    constructor(roleId: number, role: string) {
        this.roleId = roleId;
        this.role = role;
    }
}