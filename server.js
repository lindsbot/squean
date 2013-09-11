'use strict';

/**
 * Module dependencies.
 */
require('./dbHelper.js');

var express = require('express');
var http = require('http');
var path = require('path');
//var config = require('./config/config');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('production' === app.get('env')) {
  app.use(express.static(path.join(__dirname, 'dist')));
} else {
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});