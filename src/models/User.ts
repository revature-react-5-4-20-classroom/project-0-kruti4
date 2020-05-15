import Role from "./Role"
export class User {
  userId: number;// primary key
  userName: string; // not null, unique
  password: string; // not null
  firstName: string; // not null
  lastName: string; // not null
  email: string; // not null
  role: Role; // not null

  constructor(userId: number, userName: string, password: string, firstName: string, lastName: string, email: string, role: Role) {
    this.userId = userId;
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}
