'use strict';

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
    if(findByEmail(credentials.email) !== undefined) { return callback("User Already Exists");}

    var user = db.Users.build({
      email: credentials.email,
      encrypted_password: credentials.password || "test",
      first_name: credentials.first_name  || "test",
      last_name: credentials.last_name  || "test",
      state: credentials.state  || "test",
      gender: credentials.gender  || "test",
      birthday: credentials.birthday || new Date(),
      time_zone: credentials.time_zone || "test",
      favorite_shoes: credentials.favorite_shoes || "testShoes"
    })
    .save()
    .success(function(task){
      console.log("model/User.js -- user saved to db", credentials.email);
      console.log("model/User.js -- What is this ? -->", task);
      callback(null, this);
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
    return db.Users.find({where: {email: email}});
  },

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
  )


};


























