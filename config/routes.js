'use strict';

module.exports = function(app){
  var site = require('../controllers/site.js');

  app.get('/test', function(req, res){
    site.doTheThing(req.params.id, function(data) {
      res.send(data);
      res.end();
    });
  });
};