'use strict';

var passport = require('passport');
var Users = require('./db.js').Users;
var Races = require('./db.js').Races;
var ckeditor_assets = require('./db.js').ckeditor_assets;
var request = require('request');
var raceUsers = require('./db.js').Race_Users;
var apis = require('./api.js');
var ensureLoggedIn = require('connect-ensure-login');
var users = require('../controllers/users');
var pass = require('./passport.js');
var LocalStrategy = require('passport-local').Strategy;


//////////// FROM PASSPORT.JS

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(obj, done) {
    done(null,obj);
  });

  // Use local strategy
  passport.use(new LocalStrategy(function(username, password, done) {
    console.log('THIS IS LOCAL STRATEGY');
    db.Users.find({where: {first_name: username}})
    .success(function(user){
      if(!user) {
        return done(null, false, {message: 'Unknown user: ' + user});
      }
      console.log(user);
      done(null, user);
    });
  }));

//////////// FROM PASSPORT.JS


var ensureAuthenticated = function(){
  console.log("IN ensureAuthenticated !!!!!!!!!!!!");
  return function(req, res, next){
    if(req.isAuthenticated()){
      console.log("req.isAuthenticated")
      next();
    }
    res.status(401);
    res.send("THIS IS THE STRING of SANITY");
  };
};


module.exports = function(app, passport){

  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/signout', users.signout);

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('./public/index.html');
  });

  app.get('/login', function(req, res){
    res.status(200);
    res.sendfile('./public/indexLogin.html');
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info){
      if (err || !user) { res.send(402); }
      req.logIn(user, function(err) {
        if (err){
          res.send(403);
        }
        res.send(200);
        console.log(err, user, info);
      });
    })(req, res, next);
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
      console.log(res);
      res.json(body);
    });
  });
};