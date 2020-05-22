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


    [err, users] = await to(db.query(`SELECT * FROM Users WHERE username = ? and password = ?`, [name, password]));
    [err, admins] = await to(db.query(`SELECT * FROM Admins WHERE username = ? and password = ?`, [name, password]));

    if(err) {
        return res.send('Error in login!');
    } else {
      
        if(users.length <= 0 && admins.length <= 0) {
            return res.send({success: false, msg: "Invalid credentials!"});
        } else {

            let data;

            if(users.length > 0) {
                
                data = users[0];
                req.session.user_id = data.user_id;
                req.session.name = data.name;
                req.session.username = data.username;
                req.session.isLoggedIn = true;
                req.session.save();
                return res.send({success: true, admin:false}); 

            } else if(admins.length > 0) {

                data = admins[0];
                req.session.admin_id = data.admin_id;
                req.session.name = data.name;
                req.session.username = data.username;
                req.session.isAdminLoggedIn = true;
                req.session.save();
                return res.send({success: true, admin:true}); 
            }
        }
        
    }
}

exp.register = (req, res) => {
    return res.send(req.body);
}
exp.logout = async (req, res) => {
    req.session.destroy();
    return res.redirect('/');
  };
  
  
module.exports = exp;