

/*
 * GET /POST todo/checklist page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  var subjects = data.subjects;
  res.render('main_todo', {
    "subjects": subjects
  });
};


exports.add = function (req,res){

	//if new subject already exists, don't add anything
	for(var i = 0; i < data.subjects.length; i++) {
    	if (data.subjects[i]["name"].toUpperCase() == req.body.subject_name.toUpperCase()){
    		res.render('main_todo', data);
    		return;
    	}
    }

    var newSubj = {
		'name': req.body.subject_name,
		'tasks': []
	};
	data.subjects.push(newSubj);
	res.render('main_todo', data);
};
	

//for adding subject and tasks at once from new_subject_task page, can delete later
exports.added = function (req, res) {
	var i;
	if (typeof req.body.task !== 'undefined') {
		var tasks = req.body.task;
		for (i = 0; i < req.body.task.length; i++) {
			var new_task = {'name': req.body.task[i]};
			tasks[i] = new_task;
		}
	}
	var newSubj = {
		'name': req.body.subject_name,
		'tasks': tasks
	};
	data.subjects.push(newSubj);
	res.render('main_todo', {
		"subjects":data.subjects
	});
};