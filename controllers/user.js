'use strict';


var _ = require('underscore');
var User = require('../models/User.js');
var userRoles = require('../public/scripts/routesConfig.js').userRoles;


module.exports = {
  index: function(req,res){
    var users = User.findAll();
    _.each(users, function(user){
      delete user.password;
      delete user.facebook;
    });

    res.json(users);
  }
};