
/*
 * GET tutorial pages.
 */

exports.view = function(req, res){
  var page = req.params.page;
  var toLoad = {
  	'currentPage' : "/images/",
  	'nextPage' : "2"
  }
  console.log("current dir is " + __dirname);

  if (page == 2){
  	toLoad['currentPage'] += "tutorial2.jpg";
  	toLoad['nextPage'] = "3";
  }
  else if(page == 3){
	toLoad['currentPage'] += "tutorial3.jpg";
  	toLoad['nextPage'] = "4";
  }
  else if(page == 4){
  	toLoad['currentPage'] += "tutorial4.jpg";
  	toLoad['nextPage'] = "5";
  }
  else if(page == 5){
  	toLoad['currentPage'] += "tutorial5.jpg";
  	toLoad['nextPage'] = "../../main_timer_B";
  } else{
  //else, just load tutorial page 1
  	toLoad['currentPage'] += "tutorial1.jpg";
  }

  res.render('tutorial_B' , toLoad);

};
