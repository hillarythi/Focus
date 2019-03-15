
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

   res.render('main_timer',
    {
     "subjects": subjects,
     "tasks": tasks,
     "breakLength" : data.breakLength,
     "populated": false,
     "helpers": {
            makeIdHandle: function (taskName) { 
            	return taskName.replace(/\s/g,'');
            },
            toString: function (v) { 
              return '' + v;
            }
        }
   }
   );
};

exports.fill = function(req,res){

   var subjects=data.subjects
   var tasks = subjects.map( function(s) {
     return s.tasks;
  });

   console.log("RENDER FILL");
   console.log(req.body.subject + " " + req.body.task);

   res.render('main_timer', {
     "subjects": subjects,
     "tasks": tasks,
     "breakLength" : data.breakLength,
     "populated": true,
     "curr_subj": req.body.subject,
     "curr_task": req.body.task,
     "helpers": {
            makeIdHandle: function (taskName) { 
              return taskName.replace(/\s/g,'');
            },
            toString: function (v) { 
              return '' + v;
            }
        }
   });


}