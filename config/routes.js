'use strict';

var Users = require('../config/db.js').Users;
var Races = require('../config/db.js').Races;
var raceUsers = require('../config/db.js').Race_Users;

module.exports = function(app){
  //var site = require('../controllers/site.js');

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('./public/index.html');
  });

  app.get('/races', function(req, res, next){
    Races.findAll().complete(function(err, results){
      if(err) return next(err);
      res.json(results);
    });
  });

  app.get('/users', function(req, res, next){
    Users.findAll().complete(function(err, results){
      if(err) return next(err);
      res.json(results);
    });
  });

  app.get('/race_users', function(req, res, next){
    raceUsers.findAll().complete(function(err, results){
      if(err) return next(err);
      res.json(results);
  });
});



};