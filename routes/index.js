var bellcontroller = require('../doorbell-controller');
var bellSettings = require('../doorbell-settings');
var bellHistory = require('../doorbell-log');
var holidaySound = require('../holiday_sound');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	console.log('powerLevel = ' + bellSettings.powerLevel);
	console.log('currentAlarmMode = ' + bellSettings.currentAlarmMode);	
     
    res.render('DoorBell', {
      powerLevel : bellSettings.powerLevel,
      currentAlarmMode : bellSettings.currentAlarmMode,
      currentHolidayMode : bellSettings.currentHolidayMode,
      ringCount : bellHistory.ringCount,
      nextHolidaySound : holidaySound.getNextSound()
    });	
});

module.exports = router;
