var router = require('express').Router();
var bellcontroller = require('../doorbell-controller');
var bellSettings = require('../doorbell-settings');
var bellHistory = require('../doorbell-history');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('motion detected');
	bellHistory.blog('motion detected');
	if (bellSettings.currentAlarmMode == "on") {
		bellHistory.blog('ALARM !!!');
		bellController.startAlarmPattern();
	}
	res.end();
});

module.exports = router;
