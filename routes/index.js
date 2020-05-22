const router  = require("express").Router();
const auth = require(`./auth`);

router.get(`/`,(req,res)=>{
   res.render(`login`);
});

router.get(`/booking`,(req,res)=>{
   res.render(`booking`,{});
});

router.post('/login', auth.login);

module.exports = router;