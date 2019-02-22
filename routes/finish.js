
/*
 * POST finish page.
 */


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

	response.render('finish',new_display);
}

//out of total minutes, how many hour/min
function totalToReadable(total){
	var h = Math.floor(total/60);
	var m = Math.floor(total%60);
	return [h,m];
}

