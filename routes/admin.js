const to = require(`../utils/to`);
const db = require(`../config/conn`);
let exp = {};



//TODO: Add admin middleware to all admin routes
exp.viewfeedback = async(req,res)=>{

    [err, data] = await to(db.query(`SELECT username,body,rating from Feedback NATURAL JOIN Users ORDER BY rating ASC;`))
    if(err){
        console.log("Error Fetching data");
        return res.send({success:false, message:"Cannot Fetch"})
    }

    console.log("Returning data");
    return res.send(data);
}

exp.addtrain = async(req,res) =>{
    let name = req.body.name;
    let start = req.body.start;
    let end = req.body.end;
    [err,data] = await to(db.query(`CALL InsertTrain(?,?,?);`, [name,start,end]));
    if(err) {
        console.log(err)
        return res.send('Error in Inserting Train');
    } 
    console.log("Inserted Train");
    return res.send({success:true});
}
exp.editTrain = async(req,res) => {

}
exp.delayNotificationEmailList = async(req,res) => {
    let trainID = req.body.trainID;
    await to(db.query(`SET @emailList="";`));
    await to(db.query(`CALL GetEmail(@emailList,?);`, [trainID]));
    [err,data] = await to(db.query(`SELECT @emailList;`));

    if(err) {
        console.log(err)
        return res.send('Error in Inserting Train');
    } 
    console.log("Inserted Train");
    return res.send({success:true, data:data});
}


/*

Inserting Train procedure 

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
*/

/*

Inserting Train procedure 

Delimiter $$
CREATE PROCEDURE `InsertTrain`
(in trainname  varchar(255),
in start varchar(255),
in end varchar(255) )
BEGIN
	Insert into Trains(name, start, end )
	Values(trainname,start,end);
  END $$



//   TODO: Trigger in adding train 
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

INSERT STATION PROCEDURE


Delimiter $$
CREATE PROCEDURE `InsertStation` (in stationname  varchar(255))
    BEGIN
	Insert into Stations(name) Values(stationname);
    END $$
*/

module.exports = exp;