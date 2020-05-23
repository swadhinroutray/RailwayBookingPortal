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
    [err,data] = await to(db.query(`CALL InsertTrain(?);`, [name]));
    if(err) {
        console.log(err)
        return res.send('Error in Inserting Train');
    } 
    console.log("Inserted Train");
    return res.send({success:true});
}

/*

Inserting Train procedure 

Delimiter $$
CREATE PROCEDURE `InsertTrain`
(in trainname  varchar(255))
BEGIN
	Insert into Trains(name)
	Values(trainname);
  END $$
*/


module.exports = exp;