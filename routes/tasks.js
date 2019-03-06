

/*
 * TASK LIST OPERATIONS: view, add, edit, delete, update
 */


//gets "subject" through query this time, might be visually helpful for user
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


//adds new task to task list
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
    res.redirect('main_todo');

};


//displays edit mode for the task list
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
    res.redirect('main_todo');
};



//task deletion from list, just deletes from data
exports.delete = function(req,res){

    // console.log("deleting task: " + req.body.delete + " from subject: "  + req.body.subject);

     //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == req.body.subject.toUpperCase()){

            //for that subject, go through tasks to find task we want to delete
            for (var j = 0; j < data.subjects[i].tasks.length; j++){
                if (data.subjects[i].tasks[j]["name"] == req.body.delete){
                    // deletes that element
                    data.subjects[i].tasks.splice(j,1);
                    return;
                } //if
            } //for

        } //if
    } //for


};



//task list update, just replaces data
exports.update = function(req,res){

    // console.log("editing old list: " + req.body.old_subject + " which is now: "  + req.body.list.name);

    //find task list of corresponding query subject
    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == req.body.old_subject.toUpperCase()){
            data.subjects[i] = req.body.list;
        }
    } 

    //send get request with new subject name to /tasks with query subject=[newsubjectname]
    res.redirect(url.format({
        pathname:"tasks",
        query: {
          "subject": req.body.list.name
        }    
    }) );



};