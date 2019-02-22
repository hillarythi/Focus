
/*
 * POST timer page.
 */


exports.view = function(request, response) {    
	// Your code goes here
	console.log("TIMER REQUEST");
	console.log(request.body);
	var new_total_time = request.body.totalTimeSet;
	var new_subject = request.body.subject;
	var new_assignment = request.body.assignment;
	var new_hr = request.body.hour;
	var new_min = request.body.minute;
	var new_breaks = request.body.breaks;

	var breakCalculations = nextBreak(new_hr, new_min, new_breaks);
	// var new_totalMins = readableToTotal(new_hr, new_min);
	var readableTime = totalToReadable(new_total_time); //tuple

	var new_task = {};
	new_task["subject"] = new_subject;
	new_task["assignment"] = new_assignment;
	new_task["total_time_set"] = new_total_time; //total time in general
	new_task["total_hr"] = readableTime[0]; //total hours left
	new_task["total_min"] = readableTime[1]; //total minutes left
	new_task["breaks"] = new_breaks;	// breaks left
	new_task["breaks_hr"] = breakCalculations[0];  //hours left till break
	new_task["breaks_min"] = breakCalculations[1]; // + mins left till break
	new_task["breaks_total"] = breakCalculations[2]; //total minutes till break

	console.log("HOUR IS: " + new_hr + " MIN: " + new_min);
	console.log("TIMER render: ");
	console.log(new_task);

	// current.tasks.push(new_task);
	response.render('timer',new_task);
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
	var denom = parseInt(b);
	var totalNext = totalMinutes;
	if (denom!=0){
		totalNext /= denom;
	}
	console.log("totalNext: " + totalNext);
	var hrsNext = Math.floor(totalNext / 60);
	var minsNext = Math.floor(totalNext % 60);
	console.log("hrs: " + hrsNext + " mins: " + minsNext);
	return [hrsNext, minsNext, totalNext];
}

