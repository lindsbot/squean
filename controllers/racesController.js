'use strict';

var db = require('../models/db.js');

module.exports = {
  index: function(req,res){
    db.Races.findAll().success(function(data){
      res.json(data);
    }).error(function(){console.log('DB READ ERROR IN', __dirname);});
  }
};