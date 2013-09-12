'use strict';

module.exports = function(app){
  var site = require('../controllers/site.js');

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('./public/index.html');
  });

  app.get('/stuff', function(req,res){
    //may need to query req for specific model details
    var data = 'this will come from the server';
    res.status(200);
    res.end(data);
  });
};