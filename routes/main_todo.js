
/*
 * GET todo/checklist page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  var subjects = data.subjects;
  res.render('main_todo', {
    "subjects": subjects
  });
};
