// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');

//Express Middleware
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Configure ExpressJS
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("SEKR37"));
app.use(session({
    secret: 'SEKR37',
    key: 'example.sid',
    cookie:{ httpOnly: true, maxAge: 1500000 },
    resave: true,
    saveUninitialized: true
}));

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);

// port
app.listen(app.get('port'),  function () {
    console.log('Example server listening on port ' + app.get('port') + ' in ' +app.get('env') + ' mode');
});

module.exports = app;