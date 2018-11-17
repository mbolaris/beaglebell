var router = require('express').Router();

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
