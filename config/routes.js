'use strict';

//Design pattern chosen from:
//https://github.com/fnakstad/angular-client-side-auth/blob/master/server/routes.js

var _ = require('underscore');
var path = require('path');
var passport = require('passport');
var AuthCtrl = require('../controllers/authController.js');
var UserCtrl = require('../controllers/userController.js');
var RaceCtrl = require('../controllers/racesController.js');
var User     = require('../models/User.js');
var userRoles = require('../public/scripts/routesConfig.js').userRoles;
var accessLevels = require('../public/scripts/routesConfig.js').accessLevels;


function ensureAuthorized(req,res,next) {
  var role;
  if(!req.user){ role = userRoles.public; }
  else         { role = req.user.role; }

  console.log("this is the role in ensureAuthorized: ", role);

  var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;

  if(!(accessLevel.bitMask & role.bitMask)){ return res.send(403);}

  return next();
}

var routes = [

  //Views
  {  //TODO: update according to front-end convention
    path: '/views/*',
    httpMethod: 'GET',
    middleware: [function (req, res){
      var requestedView = path.join('./',req.url);
      res.render(requestedView);
    }]

  },
  //OAuth Authentications
  {
    path: '/auth/facebook',
    httpMethod: 'GET',
    middleware: [passport.authenticate('facebook')]
  },

  {
    path: '/auth/facebook/callback',
    httpMethod: 'GET',
    middleware: [passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    })]
  },

  {
    path: '/auth/runkeeper',
    httpMethod: 'GET',
    middleware: [passport.authenticate('runkeeper')]
  },

  {
    path: '/auth/runkeeper/callback',
    httpMethod: 'GET',
    middleware: [passport.authenticate('runkeeper', {
      successRedirect: '/',
      failureRedirect: '/login'
    })]
  },


  //Local Authentication
  {
    path: '/register',
    httpMethod: 'POST',
    middleware: [AuthCtrl.register]
  },
  {
    path: '/login',
    httpMethod: 'POST',
    middleware: [AuthCtrl.login]
  },
  {
    path: '/logout',
    httpMethod:'POST',
    middleware: [AuthCtrl.logout]
  },

  //Allows admin to see all users, minus sensitive information
  {
    path:'/users',
    httpMethod:'GET',
    middleware: [UserCtrl.index],
    accessLevel: accessLevels.admin
  },
  {
    path:'/racedata',
    httpMethod:'GET',
    middleware: [RaceCtrl.index]
  },

  {
    path: '/*',
    httpMethod: 'GET',
    middleware: [function(req,res) {
      var role = userRoles.public, 
         username = '';
      if(req.user){
        role = req.user.role;
        username = req.user.email;
      }
      res.cookie('user', JSON.stringify({
        'username' : username,
        'role': role
      }));
      res.redirect('/');
    }]
  }
];




module.exports = function(app){
  _.each(routes, function(route){
    route.middleware.unshift(ensureAuthorized);
    var args = _.flatten([route.path, route.middleware]);

    switch(route.httpMethod.toUpperCase()) {
      case 'GET':
        app.get.apply(app, args);
        break;

      case 'POST':
        app.post.apply(app,args);
        break;

      case 'PUT':
        app.put.apply(app,args);
        break;
      case 'DELETE':
        app.put.apply(app,args);
        break;
      default:
        throw new Error('Invalid HTTP method specified for route ' + route.path);
    }
  });

};
















