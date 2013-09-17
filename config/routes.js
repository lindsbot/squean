'use strict';

var Users = require('../config/db.js').Users;
var Races = require('../config/db.js').Races;
var ckeditor_assets = require('../config/db.js').ckeditor_assets;
var request = require('request');
var raceUsers = require('../config/db.js').Race_Users;
var apis = require('../config/api.js');
var ensureLoggedIn = require('connect-ensure-login');


var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RunKeeperStrategy = require('passport-runkeeper').Strategy;



// var users = [
//     { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
//   , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
// ];


function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  var user = Users.find({where: {first_name: username}});
  if (user.first_name === username) {
    return fn(null, user);
  }
  // for (var i = 0, len = users.length; i < len; i++) {
  //   var user = users[i];
  //   if (user.username === username) {
  //     return fn(null, user);
  //   }
  // }
  return fn(null, null);
}



module.exports = function(app, passport){
  //var site = require('../controllers/site.js');

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null,obj);
    });

    // Use local strategy

    passport.use(new LocalStrategy(
      function(username, password, done) {
        process.nextTick( function() {
          findByUsername(username, done);
        }
        );
      }
    ));

  app.post('/login',
    passport.authenticate('local',
      {successRedirect: '/',
      failureRedirect: '/loginFail'}));


      // if (req.user) { console.log(req.user); }
      // else { console.log('no such user'); }
      // res.status(200);
      // res.end(req.user);
  app.get('/loginFail', function(req, res){
    res.status(200);

    res.send('/login');
  });


    // passport.authenticate('local', {successRedirect: '/',
    // failureRedirect:'/login'}));

  app.get('/login', function(req, res){
    res.status(200);

    res.sendfile('./public/indexLogin.html');
  });

    //   passport.authenticate('local', function(err,user){
    //   if(err) {return next(err);}
    //   if(!user) {return res.redirect('/login'); }
    //   req.logIn(user)
    // });


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