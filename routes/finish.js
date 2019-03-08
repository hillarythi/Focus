
/*
 * POST finish page.
 */

var data = require('../data.json');

exports.view = function(request, response) {    
	
	var finish_subject = request.body.subject;
	var finish_assignment = request.body.assignment;
	var total_time = request.body.total_time_set;

	var readableTime = totalToReadable(total_time); //tuple

	var new_display = {};
	new_display["subject"] = finish_subject;
	new_display["assignment"] = finish_assignment;
	new_display["hours"] = readableTime[0];
	new_display["minutes"] = readableTime[1];

	//updating log
	// console.log("updating database:");
	// var found = false;
	// for(var i = 0; i < data.completed.length; i++) {
	// 	if (data.completed[i].subject === finish_subject && data.completed[i].task === finish_assignment) {
	// 		data.completed[i].time = total_time;
	// 		found = true;
	// 		break;
	// 	}
	// }
	// if(!found) {
	var newTask = {
		'subject': finish_subject,
		'task': finish_assignment,
		'time': total_time
	}
	data.completed.push(newTask);
	console.log("completed pushed:");
	console.log(newTask);
	// };

	//task deletion from list, just deletes from data
    // console.log("deleting task: " + req.body.delete + " from subject: "  + req.body.subject);

    //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == request.body.subject.toUpperCase()){

            //for that subject, go through tasks to find task we want to delete
            for (var j = 0; j < data.subjects[i].tasks.length; j++){
                if (data.subjects[i].tasks[j]["name"] == request.body.assignment){
                    // deletes that element
                    data.subjects[i].tasks.splice(j,1);
                    break;
                } //if
            } //for
            break;
        } //if
    } //for

	response.render('finish',new_display);
}

//out of total minutes, how many hour/min
function totalToReadable(total){
	var h = Math.floor(total/60);
	var m = Math.floor(total%60);
	return [h,m];
}

