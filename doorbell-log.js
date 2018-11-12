var app = require('./app');
var dateformat = require('dateformat');

function timestamp() {
	return dateformat(new Date(), "mm/dd/yy HH:MM:ss");
}


var ringCount = 0;
var recentLogCache;

var options = {
		from : new Date() - 24 * 60 * 60 * 1000,
		until : new Date()
	};

function refreshLogging() {
	getRecentLog(function(results) {

		console.log("building fresh log cache");
		console.log(results);
	});
}

refreshLogging();

var timer = setInterval(refreshLogging, 10 * 60 * 1000);

function blog(x) {
	console.log(x);
}

function getRecentLog(callback) {
	console.log("getRecentLog()");
}

exports.blog = blog;
exports.ringCount = ringCount;
exports.getRecentLog = getRecentLog;
