var bellcontroller = require('../doorbell-controller');
var bellSettings = require('../doorbell-settings');
var holidaySound = require('../holiday_sound');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	console.log('powerLevel = ' + bellSettings.powerLevel);
	console.log('currentAlarmMode = ' + bellSettings.currentAlarmMode);	
     
    var log;

    res.render('doorbell', {
      powerLevel : bellSettings.powerLevel,
      currentAlarmMode : bellSettings.currentAlarmMode,
      currentHolidayMode : bellSettings.currentHolidayMode,
      ringCount : 0,
      nextHolidaySound : holidaySound.getNextSound(),
      logging : log
    });	
});

module.exports = router;
