'use strict';

var db = require('./db.js');

module.exports = {
  index: function(req,res){
    console.log(__dirname, 'raceKindsController was called', res, req);
  }
};