'use strict';

//var config = require('./config.json');

var User

var _ = require('underscore');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var check = require('validator').check;
var userRoles = require('./../public/scripts/routesConfig.js').userRoles;
var db = require('./db.js');

module.exports = {
  addUser: function(credentials, role, callback){
    console.log('/User.js --> credentials.email :',module.exports.findByEmail(credentials.email));
    if(module.exports.findByEmail(credentials.email) !== false) { return callback('UserAlreadyExists');}
    var user = db.Users.build({
      email: credentials.email,
      encrypted_password: credentials.password || "test",
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
      console.log("model/User.js THIS USER WAS SUCCESSFULLY INSERTED :", data.email);
      callback(data.email);
    })
    .error(function(error){
      console.log("model/User.js ERROR saving to DB :", error);
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
  },1

  //Validator Docs: https://github.com/chriso/node-validator
  validate: function(requestBody){
    check(requestBody.email, ' Email must be a valid email').len(6, 64).isEmail();
    check(requestBody.password, 'Password must be between 5-20 characters').len(5,20);

    var stringArr = _.map(_.values(userRoles), function(val){ return val.toString() });
    check(requestBody.role, 'Invalid user role given').isIn(stringArr);
  },


  localStrategy: new LocalStrategy(
    function(username, password, done) {
      console.log('/models/User -- localStrategy :' + username);
      db.Users.find({where: {email: username}})
      .success(function(user){
      if(!user) {
        return done(null, false, {message: 'Unknown user: ' + user});
      }
      console.log('USERS EMAIL: ' + user.email);
      done(null, user);
      });
    }
  ),

  //TODO: review process.env and keys.
  facebookStrategy: function() {
    if(!process.env.FACEBOOK_APP_ID) { throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');}
    if(!process.env.FACEBOOK_APP_SECRET) { throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');}

    return new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
        done(null, user);
    });
  },



    serializeUser: function(user, done) {
        done(null, user.id);
    },

    deserializeUser: function(email, done) {
        var user = module.exports.findByEmail(email);

        if(user)    { done(null, user); }
        else        { done(null, false); }
    }

};


























