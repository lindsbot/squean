'use strict';

var express = require('express');
var http = require('http');

// Create an app
var app = express();

// Pass our newly created app to configuration module
require('./config/')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});