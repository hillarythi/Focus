
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index_A');
};

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  // your code here	
	$("btn btn-default btn-lg home-icon left top dusty-pink").click(buttonClick);
}

function buttonClick(e) { 
    e.preventDefault();
ga("send", "event", "button", "click");

}