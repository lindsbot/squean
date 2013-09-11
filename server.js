'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config');

var Sequelize = require('sequelize');

var app = express();

var db = new Sequelize('phantomrunner', 'root', 'plantlife');

var User = db.define('User', {
  user_name: Sequelize.STRING
});

User.sync().success(function(){
  var newUser = User.build({
    user_name: "Phantom Ruben"
  });
  newUser.save();
});

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', config.clientUrl);
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.options('*', function(req, res){
  res.send(200);
});

app.get('/test', function(req, res){
  User.findAll().success(function(data){
    res.send(data);
    res.end();
  });
});

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