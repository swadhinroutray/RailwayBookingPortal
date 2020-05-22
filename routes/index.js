const router  = require("express").Router();
const auth = require(`./auth`);
const user = require(`./user`);

router.get(`/`, auth.renderLogin);
router.post('/login', auth.login);

router.get('/register', auth.renderRegister);
router.post('/register', auth.register);

router.get(`/booking`, user.renderBooking);

module.exports = router;