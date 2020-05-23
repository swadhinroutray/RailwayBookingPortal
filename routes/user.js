const to = require(`../utils/to`);
const db = require(`../config/conn`);
let exp = {};

exp.renderBooking = (req, res) => {
    res.render(`booking`, {user: req.session});
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

module.exports = exp;

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