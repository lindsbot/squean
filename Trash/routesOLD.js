'use strict';

var passport = require('passport');
var Users = require('../models/db.js').Users;
var Races = require('../models/db.js').Races;
var ckeditor_assets = require('../models/db.js').ckeditor_assets;
var request = require('request');
var raceUsers = require('../models/db.js').Race_Users;
var apis = require('./api.js');
var ensureLoggedIn = require('connect-ensure-login');
var _ = require('underscore');
var db = require('../models/db.js');




//////////// FROM PASSPORT.JS


var ensureAuthenticated = function(){
  console.log("IN ensureAuthenticated !!!!!!!!!!!!");
  return function(req, res, next){
    if(req.isAuthenticated()){
      console.log("req.isAuthenticated")
      next();
    }
    res.status(401);
    res.send("ensureAuthenticated is firing");
  };
};


module.exports = function(app, passport){
  // app.all('*', function(req,res,next){
  //   if(req.isAuthenticated()){
  //     return next();
  //   }
  //   return res.send(401, 'Unauthorized User');
  // });

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('./public/index.html');
  });

  app.get('/login', function(req, res){
    res.status(200);
    res.sendfile('./public/indexLogin.html');
  });

  app.get('/createUser', function(req, res){
    res.status(200);
    res.sendfile('./public/createUser.html');
  });





        // {successRedirect: '/',
        // failureRedirect: '/loginFail'})



  // app.get('/secret', pass.ensureAuthenticated(), function(req, res){
  //     res.status(200);
  //     res.sendfile('./public/index.html');
  //   }
  // );

  app.get('/loginFail', function(req, res){
    res.status(200);
    res.send('/login');
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



  app.get('/ckeditor_assets', function(req, res, next){
    ckeditor_assets.findAll().complete(function(err, results){
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
      console.log('Runkeeper response: ',res);
      res.json(body);
    });
  });
};