var bellcontroller = require('../doorbell-controller');
var bellSettings = require('../doorbell-settings');
var holidaySound = require('../holiday_sound');
var bellHistory = require('../doorbell-history');
var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('motion detected');
});

module.exports = router;
