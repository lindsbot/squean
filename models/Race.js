'use strict',

var db = require('./db.js');

module.exports = {
  addRace: function(SOMESTUFF){
    console.log("addRace Fired in",__dirname);
    if(module.exports.findByRace("STUFF.racename") !== false){ return callback("Race Already Exists");}

    var race = db.Races.build({
      
    });




  }

};