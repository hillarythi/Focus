
/*
 * POST break page.
 */

 //request posted from timer.handlebars ending,
 //respond with break page, upate json


// "sub_breaks, sub_min, sub_hr" in body, edit json and move to breaks

var data = require('../data.json');

exports.view = function (request, response){
	response.render('break', data.current);
}

//currently for early break
exports.update = function(request, response) {    
	// Your code goes here
	// console.log(request);

	/* Edit JSON to reflect current situation */

	data.current["total_min"] = request.body.total_min;
	var subtract_b = data.current["breaks"]; //breaks left before taking this break
	var subtract_m = request.body.total_minutes_spent;

	console.log("BREAK UPDATING going into timer REQUEST: ");
	console.log(request.body);


	//subtract current json - above numbers, write back


	//stuff actually used in breaks
	// var new_break = {};
	if (subtract_b>0){
		//new_break["breaks"] = subtract_b-1;
		data.current["breaks"] = subtract_b-1;
	}else{
		//new_break["breaks"] = 0;
		data.current["breaks"] = 0;
	}


	//passing rest of session stuff 
	// var subject = request.body.subject;
	// var assignment = request.body.assignment;
	// var totalTimeSet = request.body.total_time_set;
	// var totalMinsLeft = request.body.total_mins_left;

	// new_break["subject"] = subject;
	// new_break["assignment"] = assignment;
	// new_break["totalTimeSet"] = totalTimeSet; //total minutes initially set by user
	// new_break["totalMinsLeft"] = totalMinsLeft;//total minutes left in study session

	// console.log("break render:");
	// console.log(new_break);

	//updating log
	// console.log("updating database:");
	// var found = false;
	// for(var i = 0; i < data.completed.length; i++) {
	// 	if (data.completed[i].subject === subject && data.completed[i].task === assignment) {
	// 		data.completed[i].time = totalTimeSet - totalMinsLeft;
	// 		found = true;
	// 		break;
	// 	}
	// }
	// if(!found) {
	// 	var newTask = {
	// 		'subject': subject,
	// 		'task': assignment,
	// 			'time': totalTimeSet - totalMinsLeft
	// 	}
	// 	data.completed.push(newTask);
	// };

	//maybe send a total time left to breaks? 
	//response.render('break', new_break);
}


