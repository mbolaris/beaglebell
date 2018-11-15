#!/usr/bin/env node

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bellSettings = require('./doorbell-settings');
var express = require('express');

var app = express();

app.set('port', bellSettings.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = require('http').createServer(app);
server.listen(app.get('port'), function(err, data) {
     console.log('BellBot server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

// socket.io options go here
io.set('log level', 3); // reduce logging - set 1 for warn, 2 for info, 3 for
// debug
io.set('browser client minification', true); // send minified client
io.set('browser client etag', true); // apply etag caching logic based on

io.sockets.on('connection', function(socket) {

     console.log('a user connected');

     socket.on('ringBell', function(data) {

          var bellcontroller = require('./doorbell-controller');
          var endpoint = socket.manager.handshaken[socket.id].address;

          if (bellController.bellRinging()) {
               bellHistory.blog('ignoring press from ' + endpoint.address + 
                         ' ring in progress.');
          }
          if (bellController.alarmRinging()) {
               bellHistory.blog('ignoring press from ' + endpoint.address + 
                         ' alarm in progress.');
          } else {
               bellHistory.ringCount++;
               io.sockets.emit("ringStart", bellHistory.ringCount);
               bellController.startDoorBellPattern(function() {
                    io.sockets.emit("ringDone");
                    if (bellSettings.currentHolidayMode == 'on') {
                         holidaySound.soundPlayed();

                         bellHistory.blog('newHolidaySound='
                                   + holidaySound.getNextSound());

                         io.sockets.emit("newHolidaySound", holidaySound
                                   .getNextSound());
                    }
               });

             bellHistory.blog('press from ' + endpoint.address);
               
//               freegeoip.getLocation(endpoint.address, function(err, location) {
//                    bellHistory.blog('press from ' + endpoint.address + ' in ' + 
//                              location.city + ', ' + location.region_code);
//               });
          }
     });

     socket.on('alarmMode',
               function(data) {
                    if (bellSettings.currentAlarmMode != data) {

                         bellSettings.currentAlarmMode = data;
                         console.log('alarmMode set to ' + 
                                   bellSettings.currentAlarmMode);

                         console.log('emmiting alarmMode ' + 
                                   bellSettings.currentAlarmMode);
                         io.sockets.emit("alarmMode",
                                   bellSettings.currentAlarmMode);
                    }
               });

     socket.on('holidayMode', function(data) {

          if (bellSettings.currentHolidayMode != data) {

               bellSettings.currentHolidayMode = data;
               console.log('holidayMode set to ' + 
                         bellSettings.currentHolidayMode);

               console.log('emmiting holidayMode ' + 
                         bellSettings.currentHolidayMode);
               io.sockets.emit("holidayMode", bellSettings.currentHolidayMode);
          }
     });

     socket.on('powerLevel', function(data) {

          if (bellSettings.powerLevel != data) {

               bellSettings.powerLevel = data;
               console.log('powerLevel set to ' + bellSettings.powerLevel);

               console.log('emmiting powerLevel ' + bellSettings.powerLevel);
               io.sockets.emit("powerLevel", bellSettings.powerLevel);
          }
     });
});

exports.io = io;
