'use strict';

var express = require('express');

module.exports = function(app) {
  app.use(express.static(__dirname + '../../public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
};
