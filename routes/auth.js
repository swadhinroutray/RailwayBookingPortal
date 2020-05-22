const bcrypt = require("bcrypt");
const to = require(`../utils/to`);
const db = require(`../config/conn`);

let exp = {};

exp.renderLogin = (req, res) => {
    res.render(`login`);
}

exp.renderRegister = (req, res) => {
    res.render(`register`);
}

exp.login = async (req, res) => {

    let name = String(req.body.username).trim();
    let password = String(req.body.pass).trim();


    [err, users] = await to(db.query(`SELECT * FROM Users WHERE username = ?`, [name]));
    [err, admins] = await to(db.query(`SELECT * FROM Admins WHERE username = ?`, [name]));

    if(err) {
        return res.send('Error in login!');
    } else {
      
        if(users.length <= 0 && admins.length <= 0) {
            return res.send({success: false, msg: "Invalid credentials!"});
        } else {

            let data;

            if(users.length > 0) {

                data = users[0]; 
                bcrypt.compare(password, data.password, async function(err, isMatch) {

                    if (err) {
                        throw err;
                    } else if (!isMatch) {
                        return res.send({success: false, msg: "Invalid credentials!"});
                    } else {
                
                        data = users[0];
                        req.session.user_id = data.user_id;
                        req.session.name = data.name;
                        req.session.username = data.username;
                        req.session.isLoggedIn = true;
                        req.session.save();
                        return res.send({success: true, admin:false});
                    }
                
                })

            } else if(admins.length > 0) {

                data = admins[0]; 

                bcrypt.compare(password, data.password, async function(err, isMatch) {

                    if (err) {
                        throw err;
                    } else if (!isMatch) {
                        return res.send({success: false, msg: "Invalid credentials!"});
                    } else {
                
                        data = admins[0];
                        req.session.admin_id = data.admin_id;
                        req.session.name = data.name;
                        req.session.username = data.username;
                        req.session.isAdminLoggedIn = true;
                        req.session.save();
                        return res.send({success: true, admin:true}); 
                    }
                
                })
            
            }
        }
        
    }
}

exp.register = async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const username = req.body.username;
    const age = req.body.age;
    const address = req.body.address;

    [err,users] = await to(db.query(`SELECT * FROM Users where username = ?`, [username]));

    if(users.length > 0) {
        return res.send({success:false, msg:'Username taken!'});
    } else {

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              return res.send({success:false, msg:'Problem in hashing password'});
            }

            let sql = `INSERT INTO Users(name,username,password,age,address) VALUES(?,?,?,?,?)`;
            [err, result] = await to(db.query(sql,[name,username,hash,age,address]));

            if(err) {
                console.log(err);
            } else {
                return res.send({success:true, msg:'Registered!'});
            }
        })
    }

}

exp.logout = async (req, res) => {
    req.session.destroy();
    return res.redirect('/');
};
  
  
module.exports = exp;