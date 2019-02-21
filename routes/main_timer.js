
/*
 * GET timer page.
 */

var data = require('../data.json');

exports.view = function(req, res){
   var subjects=data.subjects
   //var tasks=data.subjects.tasks

   var tasks = subjects.map( function(s) {
     return s.tasks;
 	});

   console.log("SUBJECTS");
   console.log(subjects);
   console.log("TASKS");
   console.log(tasks);
   res.render('main_timer', {
     "subjects": subjects,
     "tasks": tasks,
     "helpers": {
            makeIdHandle: function (taskName) { 
            	return taskName.replace(/\s/g,''); ; 
            }
        }
   });
//  res.sendFile(path.join(__dirname+'/main_timer.html'));
};
