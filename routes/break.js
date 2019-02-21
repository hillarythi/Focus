
/*
 * GET break page.
 */


exports.view = function(request, response) {    
	// Your code goes here
	// console.log(request);
	var new_subject = request.query.subject;
	console.log("SUBJECT: "+new_subject);
	var new_assignment = request.query.assignment;
	var new_hr = request.query.hour;
	var new_min = request.query.minute;
	var new_breaks = request.query.breaks;

	var breakCalculations = nextBreak(new_hr, new_min, new_breaks);

	var new_task = {};
	new_task["subject"] = new_subject;
	new_task["assignment"] = new_assignment;
	new_task["total_hr"] = new_hr;
	new_task["total_min"] = new_min;
	new_task["breaks"] = new_breaks;
	new_task["breaks_hr"] = breakCalculations[0];
	new_task["breaks_min"] = breakCalculations[1];


	console.log("NEW TASK: ");
	console.log(new_task);

	// current.tasks.push(new_task);
	response.render('break',new_task);
}

//break calculation
function nextBreak( h, m, b){
	var totalMinutes = (parseInt(h)*60)+parseInt(m);
	console.log("totalMinutes: " + totalMinutes);
	var totalNext = totalMinutes/parseInt(b);
	console.log("totalNext: " + totalNext);
	var hrsNext = Math.floor(totalNext / 60);
	var minsNext = Math.floor(totalNext % 60);
	console.log("hrs: " + hrsNext + " mins: " + minsNext);
	return [hrsNext, minsNext];
}

