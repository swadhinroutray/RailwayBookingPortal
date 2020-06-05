const router  = require("express").Router();
const auth = require(`./auth`);
const user = require(`./user`);
const admin = require('./admin')

//Auth Routes
router.get(`/`, auth.renderLogin);
router.post('/login', auth.login);
router.get(`/logout`,auth.logout)
router.get('/register', auth.renderRegister);
router.post('/register', auth.register);

//Booking Routes
router.get(`/booking`, user.renderBooking);
router.post(`/findTrains`, user.findTrains);
router.post(`/getseat`,user.getSeatDeatils)
router.post(`/getpassangers`,user.getPassangerDetails);


//Feedback Routes
router.get(`/feedback`, user.renderFeedBack);
router.post(`/feedbackForm`,user.feedback);

//Admin Routes
router.get(`/viewfeedback`,admin.viewfeedback);
router.post(`/addtrain`, admin.addtrain);
router.post(`/addtrip`,admin.addtrips);
router.get(`/freeEmployees/:type`,admin.getFreeEmployees);
router.post(`/emailgroup`,admin.delayNotificationEmailList);
router.post(`/getearning`,admin.TripEarningAndCount);
module.exports = router;