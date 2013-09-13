'use strict';

var express = require('express');
var path = require('path');

module.exports = function(app) {
  if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.set('db', 'phantomrunner-prod');
  }
  else {
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.errorHandler());
    app.set('db', 'phantomrunner-dev');
  }
};
