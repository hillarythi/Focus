
/*
 * GET settings page.
 */
var data = require('../data.json');

exports.view = function(req, res){
  res.render('main_settings', {
    "breakLength": data.breakLength,
    "snoozeLength": data.snoozeLength
  });
};
