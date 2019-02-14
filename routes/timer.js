
/*
 * GET timer page.
 */

// var currentTask = require('../current.json');

// exports.view = function(req, res){
//    res.render('timer', currentTask);
// //  res.sendFile(path.join(__dirname+'/main_timer.html'));
// };


exports.view = function(request, response) {    
	// Your code goes here
	// console.log(request);
	var new_subject = request.query.subject;
	console.log("SUBJECT: "+new_subject);
	var new_assignment = request.query.assignment;
	var new_hr = request.query.hour;
	var new_min = request.query.minute;
	var new_breaks = request.query.breaks;
	var new_task = {};
	new_task["subject"] = new_subject;
	new_task["assignment"] = new_assignment;
	new_task["hour"] = new_hr;
	new_task["minute"] = new_min;
	new_task["breaks"] = new_breaks;
	console.log("NEW TASK: ");
	console.log(new_task);

	// current.tasks.push(new_task);
	response.render('timer',new_task);
}
