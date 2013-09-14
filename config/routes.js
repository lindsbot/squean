'use strict';

var Users = require('../config/db.js').Users;
var Races = require('../config/db.js').Races;
var request = require('request');
var raceUsers = require('../config/db.js').Race_Users;
var apis = require('../config/api.js');

module.exports = function(app){
  //var site = require('../controllers/site.js');

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('./public/index.html');
  });

  app.get('/races', function(req, res, next){
    Races.findAll().complete(function(err, results){
      if(err) { return next(err); }
      res.json(results);
    });
  });

  app.get('/users', function(req, res, next){
    Users.findAll().complete(function(err, results){
      if(err) { return next(err); }
      res.json(results);
    });
  });

  app.get('/raceUsers', function(req, res, next){
    raceUsers.findAll().complete(function(err, results){
      if(err) { return next(err); }
      res.json(results);
    });
  });

  app.get('/runkeeper', function(req, res, next){
    request.get({
      Host: 'api.runkeeper.com/user',
      Authorization: 'Bearer 9838403873314fbfbb65be15cfc699f2',
      Accept: 'application/vnd.com.runkeeper.FitnessActivityFeed+json'
    }, function(err, _res, body){
      if(err) { return next(err); }
      console.log(res);
      res.json(body);
    });
  });
};