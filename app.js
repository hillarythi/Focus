
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')


var login_A = require('./routes/login_A');
var index_A = require('./routes/index_A');
var tutorial_A = require('./routes/tutorial_A');
var new_timer_A = require('./routes/main_timer_A');
var log_A = require('./routes/main_log_A');
var todo_A = require('./routes/main_todo_A');
var settings_A = require('./routes/main_settings_A');
var timer_A = require('./routes/timer_A');
var breaks_A = require('./routes/break_A');
var new_subject_A = require('./routes/new_subject_A');
var finish_A = require('./routes/finish_A');
var tasks_A = require('./routes/tasks_A');
//can clean up code to have multiple routes in same js file

var login_B = require('./routes/login_B');
var index_B = require('./routes/index_B');
var tutorial_B = require('./routes/tutorial_B');
var new_timer_B = require('./routes/main_timer_B');
var log_B = require('./routes/main_log_B');
var todo_B = require('./routes/main_todo_B');
var settings_B = require('./routes/main_settings_B');
var timer_B = require('./routes/timer_B');
var breaks_B = require('./routes/break_B');
var new_subject_B = require('./routes/new_subject_B');
var finish_B = require('./routes/finish_B');
var tasks_B = require('./routes/tasks_B');


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

app.get('/', login_A.view);
app.get('/login_A', login_A.view);
//app.get('/login_B', login_B.view);
app.get('/index_A', index_A.view);
app.get('/tutorial_A',tutorial_A.view);
app.get('/tutorial_A/:page',tutorial_A.view);
app.get('/main_todo_A', todo_A.view);
//app.post('/main_todo', todo.added);
app.post('/main_todo_A',todo_A.add);
app.get('/main_log_A', log_A.view);
app.get('/main_settings_A', settings_A.view);
app.post('/main_settings_A', settings_A.added);
app.get('/main_timer_A', new_timer_A.view);
app.post('/main_timer_A', new_timer_A.fill);
app.post('/timer_A', timer_A.view);
app.get('/new_subject_A', new_subject_A.view);
app.post('/break_A', breaks_A.view);
app.post('/finish_A', finish_A.view);
app.get('/tasks_A', tasks_A.view);
app.post('/tasks_A', tasks_A.add);

app.get('/login_B', login_B.view);
app.get('/index_B', index_B.view);
app.get('/tutorial_B',tutorial_B.view);
app.get('/tutorial_B/:page',tutorial_B.view);
app.get('/main_todo_B', todo_B.view);
//app.post('/main_todo', todo.added);
app.post('/main_todo_B',todo_B.add);
app.get('/main_log_B', log_B.view);
app.get('/main_settings_B', settings_B.view);
app.post('/main_settings_B', settings_B.added);
app.get('/main_timer_B', new_timer_B.view);
app.post('/main_timer_B', new_timer_B.fill);
app.post('/timer_B', timer_B.view);
app.get('/new_subject_B', new_subject_B.view);
app.post('/break_B', breaks_B.view);
app.post('/finish_B', finish_B.view);
app.get('/tasks_B', tasks_B.view);
app.post('/tasks_B', tasks_B.add);



app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
