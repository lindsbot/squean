'use strict';

var passport = require('passport');
var User = require('../models/User.js');

module.exports = {
  register: function(req, res, next){
      try{
        User.validate(req.body);
      }
      catch(err){
        return res.send(400, err.message);
      }
      //Ensure error strings are identical in User.js
      User.addUser(req.body, req.body.role, function(err, user){
        if(err === 'UserAlreadyExists'){
          return res.send(403, 'User already Exists');}

        else if(err){
          return res.send(500);}

        req.logIn(user, function(err){
          console.log("req.LogIn inside authController: ", user);
          if(err){
            next(err);}

          else {
            res.json(200, {'role': user.role, 'username': user.email});}
        });
      });
    },

  login: function(req, res, next){
          console.log("req: " + req.dataValues, "res: " + res);

    passport.authenticate('local', function(err, user){
      console.log("login error: ", err);

      if(err) {
        return next(err);
      }
      if(!user) {
        return res.send(400);
      }
      req.logIn(user, function(err){
        if(err) {
          return next(err);
        }

        if(req.body.rememberme) {
          req.session.cookie.maxAge = 1000*60*60*24*7;
        }
        return res.json(200, {'role': user.role, 'username': user.email });
      });
    })(req, res, next);
  },

    logout: function(req, res){
      req.logout();
      // res.redirect('/');
      res.send(200);
    }
  };





