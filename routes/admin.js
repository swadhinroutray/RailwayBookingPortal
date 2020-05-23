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

module.exports = exp;