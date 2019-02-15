
/*
 * GET timer page.
 */

var data = require('../data.json');

exports.view = function(req, res){
   var subjects=data.subjects
   var tasks=data.subjects.tasks
   res.render('main_timer', {
     "subjects": subjects,
     "tasks": tasks
   });
//  res.sendFile(path.join(__dirname+'/main_timer.html'));
};
