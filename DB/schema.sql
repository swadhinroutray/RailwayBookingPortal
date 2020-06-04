CREATE TABLE `Users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`age` INT(11) NOT NULL,
	`address` varchar(255) NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `Trains` (
	`train_id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`train_id`)
);

CREATE TABLE `Stations` (
	`sid` INT(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`state` varchar(255) NOT NULL,
	PRIMARY KEY (`sid`)
);

CREATE TABLE `Trips` (
	`trip_id` INT(11) NOT NULL AUTO_INCREMENT,
	`train_id` INT NOT NULL,
	`admin_id` INT NOT NULL,
	`from` INT(11) NOT NULL,
	`to` varchar(11) NOT NULL,
	`d_date` DATE NOT NULL,
	`a_date` DATE NOT NULL,
	`d_time` TIME NOT NULL,
	`a_time` TIME NOT NULL,
	`driver_id` INT NOT NULL,
	`tc_id` INT NOT NULL,
	`status` varchar(255) NOT NULL,
	`fare` INT NOT NULL DEFAULT '30',
	PRIMARY KEY (`trip_id`)
);

CREATE TABLE `Ticket Collectors` (
	`tc_id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`age` INT(11) NOT NULL,
	`address` varchar(255) NOT NULL,
	PRIMARY KEY (`tc_id`)
);

CREATE TABLE `Drivers` (
	`driver_id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`age` INT(11) NOT NULL,
	`address` varchar(255) NOT NULL,
	PRIMARY KEY (`driver_id`)
);

CREATE TABLE `Passengers` (
	`pid` INT NOT NULL AUTO_INCREMENT,
	`trip_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`name` varchar(255) NOT NULL,
	`status` varchar(255) NOT NULL,
	PRIMARY KEY (`pid`)
);

CREATE TABLE `Admins` (
	`admin_id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`age` INT(11) NOT NULL,
	`address` varchar(255) NOT NULL,
	PRIMARY KEY (`admin_id`)
);

CREATE TABLE `Feedback` (
	`user_id` INT(11) NOT NULL AUTO_INCREMENT,
	`trip_id` INT(11) NOT NULL AUTO_INCREMENT,
	`body` varchar(255) NOT NULL,
	`rating` INT NOT NULL,
	PRIMARY KEY (`user_id`,`trip_id`)
);

CREATE TABLE `Ticket` (
	`pid` INT NOT NULL,
	`trip_id` INT NOT NULL,
	`coach` varchar(255) NOT NULL,
	`seat_no` INT(11) NOT NULL,
	PRIMARY KEY (`pid`,`trip_id`,`coach`,`seat_no`)
);

ALTER TABLE `Trips` ADD CONSTRAINT `Trips_fk0` FOREIGN KEY (`train_id`) REFERENCES `Trains`(`train_id`);

ALTER TABLE `Trips` ADD CONSTRAINT `Trips_fk1` FOREIGN KEY (`admin_id`) REFERENCES `Admins`(`admin_id`);

ALTER TABLE `Trips` ADD CONSTRAINT `Trips_fk2` FOREIGN KEY (`from`) REFERENCES `Stations`(`sid`);

ALTER TABLE `Trips` ADD CONSTRAINT `Trips_fk3` FOREIGN KEY (`to`) REFERENCES `Stations`(`sid`);

ALTER TABLE `Trips` ADD CONSTRAINT `Trips_fk4` FOREIGN KEY (`driver_id`) REFERENCES `Drivers`(`driver_id`);

ALTER TABLE `Trips` ADD CONSTRAINT `Trips_fk5` FOREIGN KEY (`tc_id`) REFERENCES `Ticket Collectors`(`tc_id`);

ALTER TABLE `Passengers` ADD CONSTRAINT `Passengers_fk0` FOREIGN KEY (`trip_id`) REFERENCES `Trips`(`trip_id`);

ALTER TABLE `Passengers` ADD CONSTRAINT `Passengers_fk1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`);

ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`);

ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_fk1` FOREIGN KEY (`trip_id`) REFERENCES `Trips`(`trip_id`);

ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_fk0` FOREIGN KEY (`pid`) REFERENCES `Passengers`(`pid`);

ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_fk1` FOREIGN KEY (`trip_id`) REFERENCES `Trips`(`trip_id`);



insert into Users(name,password,age,address) values("devang","abc",20,"Delhi");
insert into Users(name,password,age,address) values("swadhin","abc",20,"Pune");
insert into Users(name,password,age,address) values("dhruv","abc",20,"Pune");

insert into Admins(name,password,age,address) values("admin","abc",20,"Delhi");

insert into Drivers(name,age,address) values("Mukesh Ranjan", 40,"Udupi");
insert into TC(name,age,address) values("Harish Kumar", 40, "Udupi");

insert into Stations(name,state) values("Nagpur", "Maharashtra");
insert into Stations(name,state) values("Mumbai", "Maharashtra");
insert into Stations(name,state) values("Delhi", "Delhi");
insert into Stations(name,state) values("Chennai", "Tamil Nadu");
insert into Stations(name,state) values("Udupi", "Karnataka");
insert into Stations(name,state) values("Jaipur", "Rajasthan");
insert into Stations(name,state) values("Bangalore", "Karnataka");
insert into Stations(name,state) values("Mangalore", "Karnataka");
insert into Stations(name,state) values("Kolkata", "West Bengal");

insert into Trains(name) values("Rajdhani");
insert into Trains(name) values("Goa Express");
insert into Trains(name) values("Udupi Express");
insert into Trains(name) values("Malabar Express");

insert into Passengers(trip_id,user_id,status) values(1,2,"scheduled");
insert into Ticket(pid,trip_id,coach,seat_no,status,price) values(3,1,"sleeper",20,"confirmed",100);
