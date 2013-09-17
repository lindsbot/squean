'use strict';

var express = require('express');
var passport = require('passport');
var http = require('http');










// Create an app
var app = express();

// Pass our newly created app to configuration module
require('./config/')(app, passport);



//Pass app and passport to routes
require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});