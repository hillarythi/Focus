
/*
 * GET break page.
 */

 //request posted from timer.handlebars ending,
 //respond with break page, upate json


// "sub_breaks, sub_min, sub_hr" in body, edit json and move to breaks


//currently for early break
exports.view = function(request, response) {    
	// Your code goes here
	// console.log(request);

	/* Edit JSON to reflect current situation */
	var subtract_b = request.body.breaks_before;
	var subtract_m = request.body.total_minutes_spent;

	console.log("BREAK REQUEST: ");
	console.log(request.body);


	//subtract current json - above numbers, write back


	//stuff actually used in breaks
	var new_break = {};
	new_break["breaks"] = subtract_b-1;


	//passing rest of session stuff 
	var subject = request.body.subject;
	var assignment = request.body.assignment;
	var totalTimeSet = request.body.total_time_set;
	var totalMinsLeft = request.body.total_mins_left;

	new_break["subject"] = subject;
	new_break["assignment"] = assignment;
	new_break["totalTimeSet"] = totalTimeSet;
	new_break["totalMinsLeft"] = totalMinsLeft;

	//maybe send a total time left to breaks? 
	response.render('break', new_break);
}


