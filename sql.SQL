CREATE TABLE reimbursement
(
    reimbursementId: int not null, 
    author: int,
    amount: int  not null,
    dateSubmitted: int not null,
    dateResolved: int not null,
    description : varchar(100) not null,
    resolver: number,
    status: int not null,
    type: int, 
    constraint pk_reimbursement primary key (reimbursementId)
);


create table reimbursement_status
(
    statusId:int not null,,
    status:varchar(100) not null unique,
    constraint pk_reimbursement_status primary key (statusId)
)
create table reimbursement_types
(
    typeId :int not null,
    type :varchar(15) not null unique,
    constraint pk_reimbursement_types primary key (typeId)
)

create table role
(
    roleId:int not null,
    role:varchar(30) not null unique,
    constraint pk_role primary key (roleId)


)
create table user
(
    userId: int not null,
    userName: varchar null unique, 
    password: varchar not null,
    firstName: varchar not null,
    lastName: varchar not null,
    email: varchar not null,
    role: Role; 

)

--foreign keys for table reimbursement
alter table reimbursement add constraint fk_reimbursement_user
foreign key (auther) reference user (userId) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table reimbursement add constraint fk_reimbursement_user
foreign key (resolver) reference user (userId) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table reimbursement add constraint fk_reimbursement_user
foreign key (status) reference Reimbursement_status (statusId) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table reimbursement add constraint fk_reimbursement_user
foreign key (type) reference Reimbursement_type () ON DELETE NO ACTION ON UPDATE NO ACTION;

--