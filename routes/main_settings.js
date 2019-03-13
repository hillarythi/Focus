
/*
 * GET/POST settings page.
 */
var data = require('../data.json');

exports.view = function(req, res){
  res.render('main_settings', {
    "breakLength": data.breakLength,
    "snoozeLength": data.snoozeLength
  });
};


exports.added = function (req, res) {
	console.log("ADDED");
	data.breakLength = req.body.break_length;
	data.snoozeLength = req.body.snooze_length;
	console.log(data);
	res.render('index');
};
