
/*
 * GET timer page.
 */

exports.view = function(req, res){
  // res.render('main_timer');
  res.sendFile(path.join(__dirname+'/main_timer.html'));
};
