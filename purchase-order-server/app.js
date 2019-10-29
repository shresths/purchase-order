var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var warehouseRouter = require('./routes/warehouse');
var productRouter = require('./routes/product');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/warehouse', warehouseRouter);
app.use('/product', productRouter);

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

// //checking mysql connection
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

// connection.query({
//   sql: 'select warehouse_name from warehouse;',
//   timeout: 40000, // 40s
// },
// function (error, results, fields) {
//   // error will be an Error if one occurred during the query
//   // results will contain the results of the query
//   // fields will contain information about the returned results fields (if any)
//   console.log("results", results);
//   console.log("fields", fields);
//   console.log("error", error);
//   let name;
//   for (name in results) {
//     console.log('name', results[name].warehouse_name);
//   }
// }
// );

module.exports = app;
