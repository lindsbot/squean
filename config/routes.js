'use strict';

module.exports = function(app){
  var site = require('../controllers/site.js');

  app.get('/', function(req, res){
    res.status(200);
    res.sendfile('app/index.html');
    res.end();
  });

  app.post('SomethingFromAngular', function(req,res){
    //may need to query req for specific model details
    var data = 'getsome stuff from database';

    res.status(200);
    res.end(data);
  });

  app.get('', function(req, res){
    site.doTheThing(req.params.id, function(data) {
      res.send(data);
      res.end();
    });
  });
};