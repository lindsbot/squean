'use strict';

var passport = require('passport');
var User = require('../models/User.js');
var userRoles = require('./../public/scripts/routesConfig.js').userRoles;
var bcrypt = require('bcrypt');

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
        if(err === 'UserAlreadyExists'){
          return res.send(403, 'User already Exists');}

        else if(err){
          return res.send(500);}

        req.logIn(user, function(err){
          if(err){
            next(err);
          }

          else {
            var role;
            if (user.admin){ role = userRoles.admin }
            else { role = userRoles.user }
            res.json(200, {'role': role, 'username': user.email});}
        });
      });
    },

  login: function(req, res, next){
          console.log("req: ", req.body);

    passport.authenticate('local', function(err, user){
      var role;
      if (user.admin){ role = userRoles.admin }
      else { role = userRoles.user }
      console.log('role in login: ', role);

      if(err) {
        console.log("login error: ", err);
        return next(err);
      }
      if(!user) {
        return res.send(400);
      }

      bcrypt.compare(req.body.password, user.encrypted_password, function(err, response){
        if (response) {
          req.logIn(user, function(err){
            if(err) {
              return next(err);
            }

            if(req.body.rememberme) {
              req.session.cookie.maxAge = 1000*60*60*24*7;
            }
            return res.json(200, {'role': role, 'username': user.email });
          });
        }
        else {
          console.log("bcrypt failure in authController");
          return res.json(401, {});
        }
      });
    })(req, res, next);
  },

  logout: function(req, res){
    req.logout();
    res.json(200, {'role': userRoles.public, 'username': ''});
  },

  index: function(req,res){
    var users = User.findAll();
    _.each(users, function(user){
      delete user.password;
      delete user.facebook;
    });

    res.json(users);
  }

  };





