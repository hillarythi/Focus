
/*
 * POST finish page.
 */

var data = require('../data.json');

exports.view = function(request, response) {    


	data.current["total_left"] = request.body.total_sec;
	var totalTime = parseInt(data.current.total_time_set);
	var totalLeft = parseInt(data.current.total_left);
	var totalSpent = totalTime-totalLeft;
	var readableTime = totalToReadable(totalSpent); //tuple

	var new_display = {};
	new_display["subject"] = data.current.subject,
	new_display["assignment"] = data.current.assignment,
	new_display["hours"] = readableTime[0];
	new_display["minutes"] = readableTime[1];
	new_display["seconds"] = readableTime[2];

	var newTask = {
		'subject': data.current.subject,
		'task': data.current.assignment,
		'time': totalSpent
	}
	data.completed.push(newTask);
	console.log("completed pushed:");
	console.log(newTask);

	
	//task deletion from todo list, just deletes from data
	
    //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == data.current.subject.toUpperCase()){

            //for that subject, go through tasks to find task we want to delete
            for (var j = 0; j < data.subjects[i].tasks.length; j++){
                if (data.subjects[i].tasks[j]["name"] == data.current.assignment){
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

//out of total seconds, how many hour/min/sec
function totalToReadable(total){
	var h = Math.floor(total/3600);
	var m = Math.floor((total%3600)/60);
	var s = Math.floor((total%3600)%60);
	h = ("0" + h).slice(-2);
	m = ("0" + m).slice(-2);
	s = ("0" + s).slice(-2);
	return [h,m,s];
}
