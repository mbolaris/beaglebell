
    var socket = io.connect();
    var soundEnabled = false;	
    var bellSound;
    var holidaySound;
    var nextHolidaySound;

    var serverPowerLevel = 100;
    var serverAlarmMode = "off";
    var holidayMode = "off";
    
    var soundIndex = 0;
    
	function buttonPress() {
	    socket.emit('ringBell');
	}

	function soundSwitch(sel) {
		if (sel.value == "on") {
			soundEnabled = true;
			switchSound.play();
		} else if (sel.value == "off") {
			soundEnabled = false;
		}		
	}
	
	function holidayModeSwitch(sel) {
		if (sel.value != holidayMode) {
			socket.emit('holidayMode', sel.value);	
		}		
	}

	function alarmModeSwitch(sel) {
		
		if (sel.value != serverAlarmMode) {
			socket.emit('alarmMode', sel.value);	
		}	
	}
	
	function powerLevel(value) {
		
		if (value != serverPowerLevel) {
			socket.emit('powerLevel', value);	
		}		
	}

	window.onload = function() {

		socket.on('ringStart', function(data) {
			ringCount.innerHTML = 'Ring Count: ' + data;

			if (soundEnabled) {
					
				if (holidayMode == "on") {
			     holidaySound = nextHolidaySound;
				holidaySound.play();
				}
				else {
					bellSound.play();
				}							
			}
		});

     	socket.on('alarmStart', function(data) {
               if (holidayMode == "on") {
                    holidaySound = nextHolidaySound;
                    holidaySound.play();
               }
               else {
                    bellSound.play();
               }
          });
		
		socket.on('ringDone', function(data) {
		});

		socket.on('ringCount', function(data) {
			ringCount.innerHTML = 'Ring Count: ' + data;
		});

		socket.on('alarmMode', function(data) {
			
			serverAlarmMode = data;
			
			if ($("#alarmMode").value != serverAlarmMode) {
 		    	$("#alarmMode").val(serverAlarmMode).slider("refresh");
			}
		});

		socket.on('holidayMode', function(data) {
			
			holidayMode = data;
			
			if ($("#holidayMode").value != holidayMode) {
 		    	$("#holidayMode").val(holidayMode).slider("refresh");
			}
		});
		
	        socket.on('newHolidaySound', function(data) {
	             
	             nextHolidaySound = new Audio(data);
	          });
		
		socket.on('powerLevel', function(data) {
			
			serverPowerLevel = data;
			
			if ($("#powerSlider").value != serverPowerLevel) {
				$("#powerSlider").val(serverPowerLevel).slider("refresh");
			}		
		});

		socket.on('bellBlogUpdate', function(data) {
			var table = document.getElementById("bellBlogTable");
			var row = table.insertRow(0);
			
			var cell1 = row.insertCell(0);
			cell1.innerHTML = data.timestamp;
			var cell2 = row.insertCell(1);
			cell2.innerHTML = data.message;

			if (table.rows.length > 50) {
				table.deleteRow(-1);
			}
		});
		
		bellSound = document.getElementById("bellSound");
		nextHolidaySound = document.getElementById("nextHolidaySound");
	};