'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var RunKeeperStrategy = require('passport-runkeeper').Strategy;
var db = require('./db.js');
var routes = require('./routes.js');

module.exports = function(passport){



// var ensureAuthenticated = function(){
//   console.log("IN ensureAuthenticated !!!!!!!!!!!!");
//   return function(req, res, next){
//     if(req.isAuthenticated()){
//       console.log("req.isAuthenticated")
//       next();
//     }
//     res.status(401);
//     res.send("THIS IS THE STRING of SANITY");
//   };
// };


};









// function findById(id, fn) {
//   var idx = id - 1;
//   if (users[idx]) {
//     fn(null, users[idx]);
//   } else {
//     fn(new Error('User ' + id + ' does not exist'));
//   }
// }

// function findByUsername(username, fn) {
//   db.Users.find({where: {first_name: username}}).success(function(user){
//       if (user.first_name === username) {
//       return fn(null, user);
//       }
//       return fn(null, null);
//     }
//   ).error(function(err){
//     console.log(err);
//   });
// }




// module.exports = {
//   findByUsername: findByUsername,
//   findById: findById
// };



// var users = [
//     { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
//   , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
// ];
