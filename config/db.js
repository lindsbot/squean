'use strict';

var config = require('./config');
require('../server.js');




var dbHelper = function(app){

  var Sequelize = require('sequelize');

  var db = new Sequelize('phantomrunner', 'root', 'plantlife');

  var models = [
    'users'
  ];

  models.forEach(function(model){
    module.exports[model] = db.import(__dirname + '/' + model);
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
    db.findAll().success(function(data){
      res.send(data);
      res.end();
    });
  });

};

module.exports.dbHelper = dbHelper;