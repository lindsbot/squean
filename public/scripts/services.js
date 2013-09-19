'use strict';

angular.module('phantomRunnerApp').factory('Auth', function($http, $rootScope, $cookieStore){
  var accessLevels;
  var userRoles;
  var currentUser = $cookieStore.get('user') || {username: '', role: userRoles.public};

  $cookieStore.remove('user');

  var changeUser = function(user){
    

  }

  return {
    // authorization functions
    // accessLevels
    // userRoles
    // user: currentUser
  }
});