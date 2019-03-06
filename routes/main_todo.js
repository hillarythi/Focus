

/*
 * TODO PAGE: view, add new subject, delete a subject,
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
	
//delete a subject list
exports.delete = function(req, res){

	// console.log("DELETING "+ req.body.subject + " LIST");

    for(var i = 0; i < data.subjects.length; i++) {
        if (data.subjects[i]["name"].toUpperCase() == req.body.subject.toUpperCase()){
            //removes subject from json array
            data.subjects.splice(i,1);
        } //if
    } //for

    //route to getting main_todo page
	res.redirect('/main_todo');
};


