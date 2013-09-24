'use strict';

var express = require('express');
var passport = require('passport');
var http = require('http');
var db = require('./models/db.js');
var User = require('./models/User.js');
// Create an app
var app = express();

// Get configuration from environment variables
app.set('port', process.env.PORT || 3000);

// Setup everything else
require('./config/environments.js')(app);

app.use(express.static(__dirname + '../../public'));
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'SECRET'}));

app.use(passport.initialize());
app.use(passport.session());

// Use passport stratgies; OAuths must be invoked '()'
passport.use(User.localStrategy);
passport.use(User.facebookStrategy());
passport.use(User.runkeeperStrategy());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

//Pass app and passport to routes.js
require('./config/routes')(app, passport);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});