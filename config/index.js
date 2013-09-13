'use strict';

module.exports = function(app) {
  // Get configuration from environment variables
  app.set('port', process.env.PORT || 3000);

  // Setup everything else
  require('./environments.js')(app);
  require('./db.js');
  //require('./middleware.js')(app);
  require('./routes.js')(app);




  app.post('/stuff', function(req,res){
    //may need to query req for specific model details
    var data = 'getsome stuff from database';

    res.status(200);
    res.end(data);
  });

};
