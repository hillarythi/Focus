
/*
 * GET log page.
 */

var data = require('../data.json');

exports.view = function(req, res){
  var completed = data.completed
  res.render('main_log_A', {
    "completed": completed
  });
};
