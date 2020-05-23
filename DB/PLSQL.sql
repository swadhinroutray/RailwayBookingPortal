
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
