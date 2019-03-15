
/*
 * POST break page.
 */

 //request posted from timer.handlebars ending,
 //respond with break page, upate json


// "sub_breaks, sub_min, sub_hr" in body, edit json and move to breaks

var data = require('../data.json');

exports.view = function (request, response){
	console.log("before going into break");
	console.log(data.current);
	response.render('break', data.current);
}

//currently for early break
exports.update = function(request, response) {    

	/* Edit JSON to reflect current situation */

	console.log("BREAK UPDATING going into timer REQUEST: ");
	console.log(request.body);


	//only updates how much time is left in total
	console.log("data current total sec left in session before: " + data.current["total_left"]);
	data.current["total_left"] = request.body.total_sec;
	var subtract_b = data.current["breaks"]; //breaks left before taking this break

	console.log("data current total sec after: " + data.current["total_left"]);

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

	response.send("success");

}


