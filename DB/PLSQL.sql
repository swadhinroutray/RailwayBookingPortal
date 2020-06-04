
--Inserting Train procedure 

Delimiter $$
CREATE PROCEDURE `InsertTrain`
(in trainname  varchar(255),
in start varchar(255),
in end varchar(255) )
BEGIN
	Insert into Trains(name, start, end )
	Values(trainname,start,end);
  END $$



-- Trigger in adding train 
delimiter $$
CREATE TRIGGER StationExists BEFORE INSERT ON Trains
    FOR EACH ROW
    BEGIN
        IF NEW.start not in (
            select name
            From Stations
            where (NEW.start=name)
        ) THEN 
            CALL InsertStation(NEW.start);
        END IF;
        IF NEW.end not in (
            select name
            From Stations 
            where (NEW.end=name)
        ) THEN 
            CALL InsertStation(NEW.end);
        END IF;
    END $$

--INSERT STATION PROCEDURE
Delimiter $$
CREATE PROCEDURE `InsertStation` (in stationname  varchar(255))
    BEGIN
	Insert into Stations(name) Values(stationname);
    END $$


--Inserting feedback procedure 

Delimiter $$
CREATE PROCEDURE `InsertFeedback`(
in userId  int(11), 
in Body  varchar(255), 
in Rating   int(11))
BEGIN
	Insert into Feedback(user_id,body,rating)
	Values(userId,Body,Rating);
  END $$

--Get Emails Cursor
Delimiter $$
CREATE PROCEDURE GetEmail (
    INOUT emailList varchar(4000),
    in trainID int
)
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE emailAddress varchar(100) DEFAULT "";
	DECLARE curEmail 
		CURSOR FOR 
			SELECT email FROM Users natural join Passengers WHERE status="active";
	DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1;
	OPEN curEmail;
	getEmail: LOOP
		FETCH curEmail INTO emailAddress;
		IF finished = 1 THEN 
			LEAVE getEmail;
		END IF;
		SET emailList = CONCAT(emailAddress,";",emailList);
	END LOOP getEmail;
    CLOSE curEmail;
    END $$

