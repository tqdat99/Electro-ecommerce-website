var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// testttttttt
var flash    = require('connect-flash');
var session      = require('express-session');
var bodyParser = require("body-parser");
var passport = require('passport')
// testttttttt

var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store');
var accountRouter = require('./routes/account');
var adminRouter = require('./routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(flash());

require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// testttttt

app.use('/', indexRouter);
app.use('/store', storeRouter);
app.use('/account', accountRouter);
app.use('/admin', adminRouter);

var usersRouter = require('./routes/users')(passport);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    //console.log(err)
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    //res.send({ hello: 'world' })
});

module.exports = app;