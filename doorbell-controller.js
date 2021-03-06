
//var bonescript = require('octalbonescript');
var bonescript = require('bonescript');
var bellSettings = require('./doorbell-settings');
var bellHistory = require('./doorbell-history');
var app = require('./app');
var holidaySound = require('./holiday_sound');

var bellPin = "P8_13";
var buttonPin = "P8_19";

var doorBellPattern=[300,150,300];
var doorBellStep = -1;
var doorBellDoneCallback;

var alarmPattern=[50, 150, 50, 150, 50, 150, 50, 150, 50];
var alarmStep = -1;
var alarmDoneCallback;

// configure bell and button pins
bonescript.pinMode(bellPin, bonescript.ANALOG_OUTPUT);
bonescript.analogWrite(bellPin, 0.01);
bonescript.pinMode(buttonPin, bonescript.INPUT);
bonescript.attachInterrupt(buttonPin, true, bonescript.CHANGE, buttonInterruptCallback);

function checkButton(err, value) {
	console.log('value = ' + value);
	if (value == 1 && doorBellStep != -1) {
		console.log('ignoring physical button press doorBellStep is ' + doorBellStep);		
	} else if (value == 1) {	
		app.io.sockets.emit("ringStart", bellHistory.ringCount);
		bellHistory.blog('press from front door');	
		startDoorBellPattern(function() {app.io.sockets.emit("ringDone");});	
	}
}

function buttonInterruptCallback() {
	bonescript.digitalRead(buttonPin, checkButton);
}

function startAlarmPattern() {
	console.log('startAlarmPattern()');
	
	app.io.sockets.emit("alarmStart");
     
     holidaySound.soundPlayed();
     app.io.sockets.emit("newHolidaySound", holidaySound.getNextSound()); 
	
//	alarmStep = 0;
//	doAlarmStep();
}

function startDoorBellPattern(callback) {
	console.log('startDoorBellPattern()');

	doorBellDoneCallback = callback;
	doorBellStep = 0;
	doDoorBellStep();
}

function doDoorBellStep() {
	if (doorBellStep == -1) {
		console.log('doDoorBellStep() called with -1');
	} else if (doorBellStep < doorBellPattern.length) {
		console.log('step ' + doorBellStep + ' ' + 
				((doorBellStep + 1) % 2) * bellSettings.powerLevel / 100 + ' for ' + 
				doorBellPattern[doorBellStep]);
				
		if ((doorBellStep + 1) % 2) {
			bonescript.analogWrite(bellPin, bellSettings.powerLevel / 100.0, 2000);
		} else {
			bonescript.analogWrite(bellPin, 0.001);
		}

		setTimeout(doDoorBellStep, doorBellPattern[doorBellStep]);
		doorBellStep++;
		console.log('step is now ' + doorBellStep);	
	} else {
		bonescript.analogWrite(bellPin, 0.001);
		doorBellStep = -1;
		doorBellDoneCallback();
	}
}

function doAlarmStep() {
	if (alarmStep == -1) {
		console.log('doAlarmStep() called with -1');

	} else if (alarmStep < alarmPattern.length) {

		console.log('step ' + alarmStep + ' ' + 
				(alarmStep % 2) * bellSettings.powerLevel / 100 + ' for ' + 
				alarmPattern[alarmStep]);

		bonescript.analogWrite(bellPin, ((alarmStep + 1) % 2) * bellSettings.powerLevel / 100);
		setTimeout(doAlarmStep, alarmPattern[alarmStep]);
		alarmStep++;
	} else {
		bonescript.analogWrite(bellPin, 0);
		alarmStep = -1;
	}
}

function bellRinging() {
	return doorBellStep != -1;
}

function alarmRinging() {
	return alarmStep != -1;
}

exports.startAlarmPattern = startAlarmPattern;
exports.startDoorBellPattern = startDoorBellPattern;
exports.bellRinging = bellRinging;
exports.alarmRinging = alarmRinging;

