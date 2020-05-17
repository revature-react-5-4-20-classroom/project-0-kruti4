CREATE TABLE reimbursement
(
    reimbursement_id: int not null, 
    author: int,
    amount: int  not null,
    dateSubmitted: date not null,
    dateResolved: date not null,
    "description" : varchar(100) not null,
    resolver: int,
    "status": int not null,
    "type": int, 
    constraint pk_reimbursement primary key (reimbursement_id)
);


create table reimbursement_status
(
    status_id serial,
    "status" varchar(100) not null unique,
    constraint pk_reimbursement_status primary key (status_id)
)
create table reimbursement_types
(
    type_id  serial,
    "type"  varchar(15) not null unique,
    constraint pk_reimbursement_types primary key (type_id)
)

create table roles
(
    role_id serial,
    "role" varchar(30) not null unique,
    constraint pk_role primary key (role_id)


)
create table users
(
    user_id  serial not null,
    username varchar null unique, 
    "password" varchar not null,
    firstname varchar not null,
    lastname varchar not null,
    email varchar not null,
    "role" int,-- include roleId of roll
    constraint pk_user primary key (user_id)
)

--foreign keys for table reimbursement
alter table reimbursement add constraint fk_reimbursement_user
foreign key (author) reference user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table reimbursement add constraint fk_reimbursement_user
foreign key (resolver) reference user (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table reimbursement add constraint fk_reimbursement_user
foreign key (status) reference Reimbursement_status (status_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table reimbursement add constraint fk_reimbursement_user
foreign key (type) reference Reimbursement_types (type_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

--


--finance-manager,admin,manager, developer
 
---inserting data into users table
insert into users values(default,'user0','ldsjkl','jane','doe','janed@gmial.com',1);  
insert into users values(default,'user1','asdfg','john','doe','johnd@gmial.com',3); 
insert into users values(default,'user3','awrfg','abc','xyz','abc@gmial.com',4);
insert into users values(default,'user4','gsdgfg','pqr','doe','[qr]@gmial.com',3);  
insert into users values(default,'user5','asdfg','ijk','xyz','ijk@gmial.com',2); 


insert into roles values (1,'admin');
insert into roles values (2,'developer');
insert into roles values (3,'finance-manager');
insert into roles values (4,'manager');


insert into Reimbursement_status values(1 ,'approved');
insert into Reimbursement_status values(2,'pending');
insert into Reimbursement_status values(3,'denied');

insert into reimbursement_types values(1,'lodging');
insert into reimbursement_types values(2,'travel');
insert into Reimbursement_types values(3,'food');
insert into reimbursement_types values(4,'other');

insert into reimbursement values (default,1,150,'2018-12-31','2019-1-10','business trip',2,2,2);
insert into reimbursement values (default,2,50,'2019-02-02','2019-02-10','client dinner',4,1,3);
insert into reimbursement values (default,3,50,'2019-03-03','2019-03-20','meeting cofee',2,1,3);
insert into reimbursement values (default,5,200,'2019-04-04','2019-04-25','software licence',2,2,4);




 reimbursement_id: int not null, 
    author: int,
    amount: int  not null,
    dateSubmitted: date not null,
    dateResolved: date not null,
    "description" : varchar(100) not null,
    resolver: int,
    "status": int not null,
    "type": int, 