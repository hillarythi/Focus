
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var login = require('./routes/login');
var index = require('./routes/index');
var new_timer = require('./routes/main_timer');
var log = require('./routes/main_log');
var todo = require('./routes/main_todo');
var settings = require('./routes/main_settings');
var timer = require('./routes/timer');
var breaks = require('./routes/break');
var new_subject = require('./routes/new_subject');
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.get('/index', index.view);
app.get('/main_todo', todo.view);
app.get('/main_log', log.view);
app.get('/main_settings', settings.view);
app.get('/main_timer', new_timer.view);
app.post('/timer', timer.view);
app.get('/new_subject', new_subject.view)
app.post('/break', breaks.view);
app.post('/timer/session', timer.continue);
// app.get('/current', current.changeCurrent); //add task to current json
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
