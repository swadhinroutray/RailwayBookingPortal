const to = require(`../utils/to`);
const db = require(`../config/conn`);
let exp = {};

exp.renderBooking = (req, res) => {
    res.render(`booking`, {});
}

module.exports = exp;