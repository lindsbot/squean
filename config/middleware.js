'use strict';

var express = require('express');


module.exports = function(app, passport) {
  //app.use(express.static(__dirname + '../../public'));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'SECRET'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  console.log("IN MIDDLEWARE !!!!!!!!!!!!!!!!!!!!!!!" + JSON.stringify(passport,null,4));
};

