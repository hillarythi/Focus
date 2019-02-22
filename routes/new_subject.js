
/*
 * GET new_subject page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  var subjects = data.subjects;
  res.render('new_subject', {
    "subjects": subjects
  });
};
