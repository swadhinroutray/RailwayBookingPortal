const to = require(`../utils/to`);
const db = require(`../config/conn`);
let exp = {};

exp.renderBooking = (req, res) => {
    res.render(`booking`, {user: req.session});
}

exp.findTrains = async(req,res) => {
    return res.send(req.body);
}

exp.renderFeedBack = (req,res) =>{
    res.render(`feedback`,{})
}
exp.feedback =  async (req,res) => {
    let user_id = req.session.user_id;
    let body   = String(req.body.feedback).trim();
    let rating = req.body.rating;
    [err,data] = await to(db.query(`CALL InsertFeedback(?, ?, ?);`, [user_id,body,rating]));
    if(err) {
        console.log(err)
        return res.send('Error in Inserting Feedback');
    } 
    console.log("Inserted Feedback");
    return res.send({success:true});
    
}

exp.getSeatDeatils = async(req,res) =>{
    const trip_id = req.body.trip_id;
    const user_id = req.session.user_id;
    [err,data]= await to(db.query(`select coach, seat_no, status from Ticket where pid in (select pid from Passengers where trip_id = ? and user_id = ?);`,[trip_id,user_id]));
    if(err) {
        console.log(err)
        return res.send({success:false,data:'Error in getting seat details'});
    } 
    return res.send({success:true,data:data});
   
}

exp.getPassangerDetails = async(req,res)=>{
    const trip_id = req.body.trip_id;
    [err,data]= await to(db.query(`select name, age, address from Users where user_id in (select user_id from Passengers where trip_id = ?);`,[trip_id]));
    if(err) {
        console.log(err)
        return res.send({success:false,data:'Error in getting passanger details'});
    } 
    return res.send({success:true,data:data});
}

/*

Inserting feedback procedure 

Delimiter $$
CREATE PROCEDURE `InsertFeedback`(
in userId  int(11), 
in Body  varchar(255), 
in Rating   int(11))
BEGIN
	Insert into Feedback(user_id,body,rating)
	Values(userId,Body,Rating);
  END $$
*/
module.exports = exp;
