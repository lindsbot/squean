'use strict';

(function(exports){

  var config = {

    roles: [
      'public',
      'user',
      'race_manager',
      'admin'
    ],

    accessLevels: {
      'public': '*',
      'user' : ['public'],
      'race_manager' : ['user', 'public'],
      'admin' : ['admin']
    }
  };



//Method to build bitMask for each  role
  var buildRoles = function(roles){
    var bitMask = '01';
    var userRoles = {};

    for(var role in roles){
      var intCode = parseInt(bitMask, 2);
      userRoles[roles[role]] = {
        bitMask: intCode,
        title: roles[role]
      };

      bitMask = (intCode << 1).toString(2);
    }
    return userRoles;
  };


  var buildAccessLevels = function(accessLevelDeclarations, userRoles){
    var accessLevels = {};

    for(var level in accessLevelDeclarations){
      if(typeof accessLevelDeclarations[level] === 'string'){
        if(accessLevelDeclarations[level] === '*'){
          var resultBitMask = '';

          for(var role in userRoles){
            resultBitMask += '1';

          }

          accessLevels[level] = {
            bitMask: parseInt(resultBitMask, 2),
            title: accessLevelDeclarations[level]
          };
        }
        else {
          console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
        }
      }
      else {
        var resultBitMask = 0;
        for(var role in accessLevelDeclarations[level]){
          if(userRoles.hasOwnProperty(accessLevelDeclarations[level][role])){
            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;

          }
          else {
            console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
          }
        }
        accessLevels[level] = {
          bitMask: resultBitMask,
          title: accessLevelDeclarations[level][role]
        };
      }
    }

    return accessLevels;
  };
  exports.userRoles = buildRoles(config.roles);
  exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

})(typeof exports === 'undefined' ? this['routesConfig'] = {} : exports);























