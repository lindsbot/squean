'use strict';

var passport = require('passport');
var User = require('../models/User.js');

module.exports = {
  register: function(req, res, next){
      try{
        User.validate(req.body);
      }
      catch(err){
        console.log(err, __dirname);
        return res.send(400, err.message);
      }
      //Ensure error strings are identical in User.js
      User.addUser(req.body, req.body.role, function(err, user){
        console.log("auth.js thinks this is the err: ", err);
        console.log("auth.js thinks this is the user: ", user.dataValues.email);
        if(err === 'UserAlreadyExists'){
          return res.send(403, 'User already Exists');}

        else if(err){
          console.log(err, __dirname);
          return res.send(500);}



        req.logIn(user.dataValues, function(err){
          if(err){
            next(err);
          }

        res.json(200, {'role': 'admin', 'email': user.email});

        });
      });
    },

  login: function(req, res, next){
    passport.authenticate('local', function(err, user){
      console.log("Inside auth.js/login--- " + "req: " + req, "res: " + res, "user: " + user);
      if(err) {
        return next(err); }
      if(!user) {
        return res.send(400); }

    if(req.body.rememberme) {
      req.session.cookie.maxAge = 1000*60*60*24*7;
    }

    return res.json(200, {'role': 'admin', 'email': user.email });
    })(req, res, next);
  },

    logout: function(req, res){
      req.logout();
      res.send(200);
    }
  };





