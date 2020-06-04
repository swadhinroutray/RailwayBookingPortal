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
exp.addtrips = async(req,res) =>{
    const  trainID = req.body.trainID;
    const admin_id = req.session.admin_id;
    const from_sid= req.body.from;
    const to_sid = req.body.to;
    const dDate = req.body.dDate;
    const aDate = req.body.aDate;
    const dTime= req.body.dTime;
    const aTime = req.body.aTime;
    const driverID = req.body.driver;
    const tcID = req.body.tcID;
    const status = "active";


            let sql = `INSERT INTO Trips(train_id,admin_id,from_sid,to_sid,d_date,a_date,d_time,a_time,driver_id,tc_id,status) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
            [err, result] = await to(db.query(sql,[trainID,admin_id,from_sid,to_sid,dDate,aDate,dTime,aTime,driverID,tcID,status]));

            if(err) {
                console.log(err);
                return res.send(err);
            } else {
                return res.send({success:true, msg:'Added new Trip!'});
            }
}

exp.delayNotificationEmailList = async(req,res) => {
    let trainID = req.body.trainID;
    await to(db.query(`SET @emailList="";`));
    await to(db.query(`CALL GetEmail(@emailList,?);`, [trainID]));
    [err,data] = await to(db.query(`SELECT @emailList;`));

    if(err) {
        console.log(err)
        return res.send('Error in getting email List');
    } 
    console.log("Inserted Train");
    return res.send({success:true, data:data});
}

exp.getFreeEmployees = async(req,res) => {
    if(req.params.type == 1){
        [err,data] = await to(db.query(`Select * from Drivers WHERE driver_id NOT IN (SELECT driver_id from Trips);`))
        if(err){
            console.log(err);
            return res.send(err);
        }
        if(data.length ==0){
            return res.send({success:true,data:"No free Drivers"})
        }
    

        return res.send({success:true,data:data});
    }
    if(req.params.type == 2)
    {
        [err,data] = await to(db.query(`Select * from TC WHERE tc_id NOT IN (SELECT tc_id from Trips);`))
        if(err){
            console.log(err);
            return res.send(err);
        }
        if(data.length ==0){
            return res.send({success:true,data:"No free TCs"})
        }
        return res.send({success:true,data:data});

    }
    else {
        return res.send({success:false,data:"Unsupported Type"})
    }
}

// exp. 
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