

/*
 * GET /POST todo/checklist page.
 */


 //get "subject" through query this time, might be helpful for user

var data = require('../data.json');

exports.view = function(req, res){
  
    //find task list of corresponding query subject
	for(var i = 0; i < data.subjects.length; i++) {
    	if (data.subjects[i]["name"].toUpperCase() == req.query.subject.toUpperCase()){
    		res.render('tasks', data.subjects[i] ); //(name, tasks[])
    		return;
    	}
    }

    //error should never get here
    console.log("error grabbing tasks");
    res.render('tasks');

};


//added new task
exports.add = function (req,res){
    var newTask = { 'name': req.body.task_name };
	// data.subjects[req.body.subj_name]["tasks"].push(newTask);

	//find task list of corresponding query subject
	for(var i = 0; i < data.subjects.length; i++) {
    	if (data.subjects[i]["name"].toUpperCase() == req.body.subj_name.toUpperCase()){
    		data.subjects[i]["tasks"].push(newTask);
    		res.render('tasks', data.subjects[i] ); //(name, tasks[])
    		return;
    	}
    }

 	//error should never get here
    console.log("error grabbing tasks");
    res.render('tasks');

};


exports.edit = function(req, res){
  
    //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == req.query.subject.toUpperCase()){
            res.render('edit_tasks', data.subjects[i] ); //(name, tasks[])
            return;
        }
    }

    //error should never get here
    console.log("error grabbing tasks");
    res.render('tasks');
};