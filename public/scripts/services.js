'use strict';

angular.module('phantomRunnerApp').factory('Auth', function($http, $rootScope, $cookieStore){
  var accessLevels;
  var userRoles;
  var currentUser = $cookieStore.get('user') || {username: '', role: userRoles.public};

  $cookieStore.remove('user');

  // change user function

  return {
    // authorization functions
    // accessLevels
    // userRoles
    // user: currentUser
  }
});