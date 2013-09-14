'use strict';

var express = require('express');
var passport = require('passport');

module.exports = function(app) {
  //app.use(express.static(__dirname + '../../public'));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'SECRET'}));
  app.use(app.router);
  app.use(passport.initialize());
  app.use(passport.session());
};
