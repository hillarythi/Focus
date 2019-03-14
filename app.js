
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')


var login = require('./routes/login');
var signup = require('./routes/signup');
var index = require('./routes/index');
var tutorial = require('./routes/tutorial');
var new_timer = require('./routes/main_timer');
var log = require('./routes/main_log');
var todo = require('./routes/main_todo');
var settings = require('./routes/main_settings');
var timer = require('./routes/timer');
var breaks = require('./routes/break');
var new_subject = require('./routes/new_subject');
var finish = require('./routes/finish');
var tasks = require('./routes/tasks');
//can clean up code to have multiple routes in same js file


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

app.get('/', index.view); //TODO change back to login.view
app.get('/signup', signup.view);
app.get('/index', index.view);
app.get('/tutorial',tutorial.view);
app.get('/tutorial/:page',tutorial.view);
app.get('/main_todo', todo.view);
//app.post('/main_todo', todo.added);
app.post('/main_todo',todo.add);
app.get('/main_log', log.view);
app.get('/main_settings', settings.view);
app.post('/main_settings', settings.added);
app.get('/main_timer', new_timer.view);
app.post('/main_timer', new_timer.fill);
app.post('/timer', timer.update);
app.get('/timer', timer.view);
app.get('/new_subject', new_subject.view);
app.get('/break', breaks.view);
app.post('/break', breaks.update);
app.post('/finish', finish.view);
app.get('/tasks', tasks.view);
app.post('/tasks', tasks.add);
app.get('/edit_tasks', tasks.edit);

app.post('/deleteSubject', todo.delete); //deletes subject list from todo (including all tasks)
app.post('/deleteTask', tasks.delete); //deletes one task as just post request, no change in rendering
app.post('/updateList', tasks.update); //updates everything in list with what user edited, including subject+alltasks

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
