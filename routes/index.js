const router  = require("express").Router();
const auth = require(`./auth`);
const user = require(`./user`);

//Auth Routes
router.get(`/`, auth.renderLogin);
router.post('/login', auth.login);
router.get(`/logout`,auth.logout)
router.get('/register', auth.renderRegister);
router.post('/registerForm', auth.register);

//Booking Routes
router.get(`/booking`, user.renderBooking);

//Feedback Routes
router.get(`/feedback`, user.renderFeedBack)
router.post(`/feedbackForm`,user.feedback)
module.exports = router;