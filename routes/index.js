var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('powerLevel = ' + bellSettings.powerLevel);
	console.log('currentAlarmMode = ' + bellSettings.currentAlarmMode);	
	// Find items logged between today and yesterday.
	bellHistory.getRecentLog(function(results) {
      res.render('doorbell', {
			powerLevel : bellSettings.powerLevel,
			currentAlarmMode : bellSettings.currentAlarmMode,
			currentHolidayMode : bellSettings.currentHolidayMode,
			ringCount : bellHistory.ringCount,
			logging : results.file,
			nextHolidaySound : holidaySound.getNextSound()
		});	
	});
});

module.exports = router;
