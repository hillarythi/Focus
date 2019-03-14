
/*
 * POST timer page.
 */
 var data = require('../data.json');


exports.view = function(request,response){
	console.log("CURRENT task rendering about to display timer: ");
	console.log(data.current);
	response.render('timer',data.current);
}

exports.update = function(request, response) {    
	// Your code goes here
	console.log("TIMER UPDATE PAGE before display timer: ");
	console.log(request.body);

	var new_total_time = request.body.totalTimeSet;
	var new_subject = request.body.subject;
	var new_assignment = request.body.assignment;
	var new_hr = request.body.hour;
	var new_min = request.body.minute;
	var new_breaks = request.body.breaks;

	if (new_breaks < 0){
		new_breaks = 0;
	}

	var breakCalculations = nextBreak(new_hr, new_min, new_breaks);
	// var new_totalMins = readableToTotal(new_hr, new_min);
	var readableTime = totalToReadable(new_total_time); //tuple

	data.current["subject"] = new_subject;
	data.current["assignment"] = new_assignment;
	data.current["total_time_set"] = new_total_time; //total time in general
	data.current["total_hr"] = readableTime[0]; //total hours left
	data.current["total_min"] = readableTime[1]; //total minutes left
	data.current["breaks"] = parseInt(new_breaks);	// breaks left
	data.current["breaks_hr"] = breakCalculations[0];  //hours left till break
	data.current["breaks_min"] = breakCalculations[1]; // + mins left till break
	data.current["breaks_total"] = breakCalculations[2]; //total minutes till break

	console.log("HOUR IS: " + new_hr + " MIN: " + new_min);

	// current.tasks.push(new_task);
	// response.render('timer',data.current);
}

function readableToTotal(h, m){
	return (parseInt(h)*60)+parseInt(m);
}

//out of total minutes, how many hour/min
function totalToReadable(total){
	var h = Math.floor(total/60);
	var m = Math.floor(total%60);
	return [h,m];
}

//break calculation
function nextBreak(h, m, b){
	var totalMinutes = (parseInt(h)*60)+parseInt(m);
	console.log("totalMinutes: " + totalMinutes);
	var totalNext = totalMinutes / (parseInt(b) + 1);
	console.log("totalNext: " + totalNext);
	var hrsNext = Math.floor(totalNext / 60);
	var minsNext = Math.floor(totalNext % 60);
	console.log("hrs: " + hrsNext + " mins: " + minsNext);
	return [hrsNext, minsNext, totalNext];
}

