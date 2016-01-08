// dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var path = require('path');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

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
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Titan Database Connection
var grex = require('grex');
var grexOptions = {
    host: '192.168.99.100',
    port: 8182,
    graph: 'graph'
}

app.set('grex', grex);

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//Passport configuration
var oauth = require('./oauth.js');
passport.use(new TwitterStrategy({
        consumerKey: oauth.twitter.consumerKey,
        consumerSecret: oauth.twitter.consumerSecret,
        callbackURL: oauth.twitter.callbackUrl
    },
    function(token, tokenSecret, profile, done) {
        /*
        User.findOrCreate(..., function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });*/
    }
));

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

app.get('/login', passport.authenticate('twitter', { successRedirect: '/',
    failureRedirect: '/login' }));

// port
app.listen(app.get('port'),  function () {
    console.log('Example server listening on port ' + app.get('port') + ' in ' +app.get('env') + ' mode');

    //test db connection
    var grex = app.get('grex');
    var client = grex.createClient(grexOptions);
    var gremlin = grex.gremlin;
    var g = grex.g;
    var query = gremlin();
    query(g);
    client.execute(query, function(err, response) {
        if(err) {
            console.log(err);
        } else {
            console.log("Titan Connected");
            console.log(response);
        }
    })
});

module.exports = app;