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

  app.get('/runKeeper', function(req, res, next){
    request.get({
      url: 'http://www.reddit.com/subreddits/popular.json',
      json: true
    }, function(err, _res, body){
      if(err) { return next(err); }
      console.log(res);
      res.json(body);
    });
  });
};