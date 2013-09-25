'use strict';

//var config = require('./config.json');



var _ = require('underscore');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var check = require('validator').check;
var userRoles = require('./../public/scripts/routesConfig.js').userRoles;
var db = require('./db.js');
var config = require('../config/env/development.json');
var bcrypt = require('bcrypt');

module.exports = {
  addUser: function(credentials, callback){
    db.Users.find({where: {email: credentials.username}}).success(function(user){
      if (user) {
        return callback('UserAlreadyExists');
      }
      else {
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(credentials.password, salt, function(err, hash){

            var user = db.Users.build({
              email: credentials.username,
              encrypted_password: hash
            })
            .save()
            .success(function(data){
              callback(null, data);
            })
            .error(function(error){
              console.log("models/User.js error saving to DB :", error);
            });
          });
        });
      }
    })
    .error(function(err){
      throw err;
    });
  },




  findAll: function(){
    db.Users.findAll().success(function(users){
      return users;
    })
    .error(function(err){
      throw err;
    });
  },

  findById: function(id){
    db.Users.find({where: {id: id}}).success(function(user){
      return user;
    })
    .error(function(err){
      throw err;
    });
  },


  findByEmail: function(email){
    db.Users.find({where: {email: email}}).success(function(user){
      if (user) {
        return true;
      }
      else {
        return false;
      }
    })
    .error(function(err){
      throw err;
    });
  },

  //Validator Docs: https://github.com/chriso/node-validator
  validate: function(requestBody){
    console.log("inside User model", requestBody);
    check(requestBody.username, ' Email must be a valid email').len(6, 64).isEmail();
    check(requestBody.password, 'Password must be between 5-20 characters').len(5,20);

    var stringArr = _.map(_.values(userRoles), function(val){ return val.toString() });
    check(requestBody.role, 'Invalid user role given').isIn(stringArr);
  },


  localStrategy: new LocalStrategy(
    function(email, password, done) {
      db.Users.find({where: {email: email}})
      .success(function(user){
      if(!user) {
        return done(null, false, {message: 'Unknown user: ' + user.dataValues});
      }
      done(null, user.dataValues);
      });
    }
  ),


  facebookStrategy: function() {
    if(!config.facebook.clientID) { throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');}
    if(!config.facebook.clientSecret) { throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');}

    return new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL || 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
        done(null, user);
    });
  },

  serializeUser: function(user, done) {
      done(null, user);
  },

  deserializeUser: function(user, done) {
      db.Users.find({where: {email: user.username}}).success(function(dbResult){
        if (dbResult) {
          done(null, user);
        }
        else {
          done(null, false);
        }
      }).error(function(err){
        throw err;
      });
  }

};














