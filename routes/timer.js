
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
	var new_total_left = request.body.totalTimeLeft;
	var new_subject = request.body.subject;
	var new_assignment = request.body.assignment;
	// var new_hr = request.body.hour; //total left
	// var new_min = request.body.minute;  //total left
	// var new_sec = request.body.seconds;  //total left
	var new_breaks = request.body.breaks;
	var break_length = request.body.breakLength;
	var break_orig = request.body.breaks_orig;

	if (new_breaks < 0){
		new_breaks = 0;
	}

	var breakCalculations = nextBreak(new_total_left, new_breaks);
	// var new_totalMins = readableToTotal(new_hr, new_min);
	var readableTime = totalToReadable(new_total_left); //tuple

	data.current["subject"] = new_subject;
	data.current["assignment"] = new_assignment;
	data.current["total_time_set"] = new_total_time; //total time set in general in seconds
	data.current["total_left"] = new_total_left; //total seconds left in session
	data.current["total_hr"] = readableTime[0]; // hours left in session
	data.current["total_min"] = readableTime[1]; // minutes left in session
	data.current["total_sec"] = readableTime[2]; // seconds left in session
	data.current["breaks"] = parseInt(new_breaks);	// breaks left
	data.current["breaks_hr"] = breakCalculations[0];  //hours left till break
	data.current["breaks_min"] = breakCalculations[1]; // + mins left till break
	data.current["breaks_sec"] = breakCalculations[2]; // + sec left till break
	data.current["breaks_total"] = breakCalculations[3]; //total seconds till break
	data.current["break_length"] = parseInt(break_length); //mins break length
	data.current["breaks_orig"] = parseInt(break_orig);

	
	response.send("success");

	// current.tasks.push(new_task);
	// response.render('timer',data.current);
}

function readableToTotal(h, m){
	return (parseInt(h)*60)+parseInt(m);
}

//out of total seconds, how many hour/min/sec
function totalToReadable(total){
	var h = Math.floor(total/3600);
	var m = Math.floor((total%3600)/60);
	var s = Math.floor((total%3600)%60);
	return [h,m,s];
}

//break calculation
function nextBreak(t, b){
	// var totalSeconds = (parseInt(h)*60*60)+(parseInt(m)*60) + (parseInt(s));
	// console.log("totalSeconds: " + totalSeconds);

	//total seconds until next break
	var totalSeconds = parseInt(t);
	var totalNext = totalSeconds / (parseInt(b) + 1);
	console.log("totalNext: " + totalNext);


	var hrsNext = Math.floor(totalNext / 3600);
	var minsNext = Math.floor((totalNext % 3600)/60);
	var secsNext = Math.floor((totalNext % 3600)%60);
	console.log("hrs: " + hrsNext + " mins: " + minsNext) + " secs: " + secsNext;
	return [hrsNext, minsNext, secsNext, totalNext];
}

