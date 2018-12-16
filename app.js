var bodyParser = require('body-parser');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'sample'
	});
	res.locals.connection.connect();
	next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(4000);

