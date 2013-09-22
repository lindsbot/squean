'use strict';

//var config = require('./config.json');



var _ = require('underscore');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RunkeeperStrategy = require('passport-runkeeper').Strategy;
var check = require('validator').check;
var userRoles = require('./../public/scripts/routesConfig.js').userRoles;
var db = require('./db.js');
var config = require('../config/env/development.json');
var bcrypt = require('bcrypt');
//TODO: Change from dev to production @ deployment.

module.exports = {
  addUser: function(credentials, callback){
    console.log('/User.js --> credentials :', credentials);
    if(module.exports.findByEmail(credentials.username) !== false) { return callback('UserAlreadyExists');}

    
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(credentials.password, salt, function(err, hash){

        var user = db.Users.build({
          email: credentials.username,
          encrypted_password: hash,
          first_name: credentials.first_name  || "test",
          last_name: credentials.last_name  || "test",
          state: credentials.state  || "test",
          gender: credentials.gender  || "test",
          birthday: credentials.birthday || new Date(),
          time_zone: credentials.time_zone || "test",
          favorite_shoe: credentials.favorite_shoes || "testShoes"
        })
        .save()
        .success(function(data){

          console.log(__dirname, "THIS USER WAS SUCCESSFULLY INSERTED :", data.email);
          console.log('these are the user roles from user.js: ', userRoles);
          callback(null, data);

        })
        .error(function(error){
          console.log("model/User.js ERROR saving to DB :", error);
        });
      });
    });

  },




  findAll: function(){
    return db.Users.findAll();
  },

  findById: function(id){
    return db.Users.find({where: {id: id}});
  },


  findByEmail: function(email){
    if(db.Users.find({where: {email: email}}) === email){
      return true;
    } else {
      return false;
    }
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
      console.log('/models/User -- localStrategy :', email);
      db.Users.find({where: {email: email}})
      .success(function(user){
      if(!user) {
        return done(null, false, {message: 'Unknown user: ' + user.dataValues});
      }
      console.log('USER IN User.js LocalStrategy: ', user.dataValues);
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

  runkeeperStrategy: function() {
    if(!config.runkeeper.clientID) { throw new Error('A Runkeeper App ID is required if you want to enable login via Facebook.');}
    if(!config.runkeeper.clientSecret) { throw new Error('A Runkeeper App Secret is required if you want to enable login via Facebook.');}

    return new RunkeeperStrategy({
        clientID: config.runkeeper.clientID,
        clientSecret: config.runkeeper.clientSecret,
        callbackURL: config.runkeeper.callbackURL || 'http://localhost:3000/auth/runkeeper/callback'
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
        var user = module.exports.findByEmail(user.email);
        console.log("trying to call this function: ", module.exports.findByEmail);
        console.log("this is the user : ", user);

        if(user)    { done(null, user); }
        else        { done(null, false); }
    }

};














