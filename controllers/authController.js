'use strict';

var passport = require('passport');
var User = require('../models/User.js');
var userRoles = require('./../public/scripts/routesConfig.js').userRoles;

module.exports = {
  register: function(req, res, next){
    console.log('userRoles in authController: ', userRoles);
      try{
        User.validate(req.body);
      }
      catch(err){
        console.log("error in authController: ", err);
        return res.send(400, err.message);
      }
      //Ensure error strings are identical in User.js
      User.addUser(req.body, function(err, user){
        console.log('in authController, req.body.role == ', req.body.role);
        if(err === 'UserAlreadyExists'){
          return res.send(403, 'User already Exists');}

        else if(err){
          return res.send(500);}

        req.logIn(user, function(err){
          if(err){
            next(err);}

          else {
            var role;
            if (user.admin){ role = userRoles.admin }
            else if (user.race_manager){ role = userRoles.race_manager } 
            else { role = userRoles.user }
            // TODO: change 'user.role' (undefined) below to be a valid role 
            res.json(200, {'role': role, 'username': user.email});}
        });
      });
    },

  login: function(req, res, next){
          console.log("req: " + req.dataValues, "res: " + res);

    passport.authenticate('local', function(err, user){
      var role;
      if (user.admin){ role = userRoles.admin }
      else if (user.race_manager){ role = userRoles.race_manager } 
      else { role = userRoles.user }

      if(err) {
        console.log("login error: ", err);
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
        return res.json(200, {'role': role, 'username': user.email });
      });
    })(req, res, next);
  },

    logout: function(req, res){
      req.logout();
      // res.redirect('/');
      res.send(200);
    }
  };





