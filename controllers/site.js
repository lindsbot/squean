'use strict';


var Users = require('../config/db.js').models.Users;


module.exports = {
  fetchItems: function(id, cb) {
    Users.id.findAll().success(function(data){
      cb(data);
    });
  }
};
