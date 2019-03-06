

/*
 * GET /POST todo/checklist page.
 */


 //get "subject" through query this time, might be helpful for user
const url = require('url');
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
    console.log("error grabbing tasks for view");
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
    		
            res.redirect(url.format({
                pathname:"tasks",
                query: {
                  "subject": req.body.subj_name
                }
            
            }) );


    		return;
    	}
    }
 	//error should never get here
    console.log("error grabbing tasks for add");
    res.render('tasks');

};


exports.edit = function(req, res){
  
    //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == req.query.subject.toUpperCase()){
            res.render('edit_tasks', data.subjects[i], 
             ); //(name, tasks[])
            return;
        }
    }

    //error should never get here
    console.log("error grabbing tasks for edit");
    res.render('tasks');
};




//task deletion, just deletes from data
exports.delete = function(req,res){

    console.log(" DATA BEFORE : "  + JSON.stringify(data));

    console.log("deleting task: " + req.body.delete + " from subject: "  + req.body.subject);

     //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == req.body.subject.toUpperCase()){
            for (var j = 0; j < data.subjects[i].tasks.length; j++){
                if (data.subjects[i].tasks[j]["name"] == req.body.delete){
                    console.log("match! " + data.subjects[i].tasks[j]["name"]);
                    // delete data.subjects[i].tasks[j];
                    data.subjects[i].tasks.splice(j,1);
                    console.log(" DATA AFTER : "  + JSON.stringify(data));
                    return;
                } //if
            } //for
        } //if
    } //for


};