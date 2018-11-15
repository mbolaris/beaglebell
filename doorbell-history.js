var app = require('./app');
var winston = require('winston');
//var dateformat = require('dateformat');

//function timestamp() {
//	return dateformat(new Date(), "mm/dd/yy HH:MM:ss");
//}

//var fs = require('fs');
//if (!fs.existsSync('./doorbell.log')) {
    // Do something
//	console.log("creating ./doorbell.log");
//	fs.writeFile('./doorbell.log');
//}

winston.stream({ start: -1 }).on('log', function(log) {
    app.io.sockets.emit("bellBlogUpdate", log);
//    recentLogCache.file.unshift(log);
  });


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      )}),
    new winston.transports.File({filename: './doorbell.log', format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A ZZ'
        }),
        winston.format.json()
      )})
  ]
});

var ringCount = 0;
var recentLogCache;

const options = {
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
	logger.info(x);
}

function getRecentLog(callback) {
	
	console.log("getRecentLog()");
	
	if (recentLogCache !== undefined) {
		console.log("using log cache");
		callback(recentLogCache);
	} 
	else {
		console.log("getting new log");
		logger.query(options, function(err, results) {
			if (err) {
				throw err;
			}
			console.log(results);

			recentLogCache = results;		
			callback(recentLogCache);
		});
	}
}

exports.blog = blog;
exports.ringCount = ringCount;
exports.getRecentLog = getRecentLog;
