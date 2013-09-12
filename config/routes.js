'use strict';

var Users = require('../config/db.js').Users;

module.exports = function(app){
  //var site = require('../controllers/site.js');

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('./public/index.html');
  });

  app.get('/stuff', function(req, res, next){
    Users.findAll({}).complete(function(err, results){
      if(err) return next(err);
      res.json(results);
    });
  });
};