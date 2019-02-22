
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var data = require('./data.json');

var login = require('./routes/login');
var index = require('./routes/index');
var new_timer = require('./routes/main_timer');
var log = require('./routes/main_log');
var todo = require('./routes/main_todo');
var settings = require('./routes/main_settings');
var timer = require('./routes/timer');
var breaks = require('./routes/break');
var new_subject = require('./routes/new_subject');
var finish = require('./routes/finish');
//can clean up code to have multiple routes in same js file
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname));

const bodyParser = require("body-parser")

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/index', index.view);
app.get('/main_todo', todo.view);
app.post('/main_todo', todo.view);
app.get('/main_log', log.view);
app.get('/main_settings', settings.view);
app.get('/main_timer', new_timer.view);
app.post('/timer', timer.view);
app.get('/new_subject', new_subject.view)
app.post('/break', breaks.view);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.post('/new_subject', function (req, res) {
	var i;
	if (typeof req.body.task !== 'undefined') {
		var tasks = req.body.task;
		for (i = 0; i < req.body.task.length; i++) {
			var new_task = {'name': req.body.task[i]};
			tasks[i] = new_task;
		}
	}
	var newSubj = {
		'name': req.body.subject_name,
		'tasks': tasks
	};
	data.subjects.push(newSubj);
});

app.post('/main_settings', function (req, res) {
	data.breakLength = req.body.break_length;
	data.snoozeLength = req.body.snooze_length;
});

app.post('/finish', finish.view);
// app.get('/current', current.changeCurrent); //add task to current json
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
