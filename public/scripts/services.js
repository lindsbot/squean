'use strict';

angular.module('phantomRunnerApp').factory('Auth', function($http, $rootScope, $cookieStore){
  var accessLevels = routesConfig.accessLevels;
  var userRoles = routesConfig.userRoles;
  var currentUser = $cookieStore.get('user') || {username: '', role: userRoles.public};

  $cookieStore.remove('user');

  var changeUser = function(user) {
    _.extend(currentUser, user);
  };

  return {
    // authorization functions
    authorize: function(accessLevel, role) {
      if (role === undefined) {
        role = currentUser.role;
      }
      return accessLevels.bitMask & role.bitMask;
    },

    isLoggedIn: function(user) {
      if (user === undefined) {
        user = currentUser;
      }
      return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
    },

    register: function(user, success, error) {
      $http.post('/register', user).success(function(res){
        changeUser(res);
        success();
      }).error(error);
    },

    login: function(user, success, error) {
      $http({
        method: 'POST',
        url: '/login',
        data: user,
         headers: {
          'Content-Type': 'application/json'
         }
      }).success(function(user){
        changeUser(user);
        success(user);
      }).error(error);
    },

    logout: function(success, error) {
      $http.post('/logout').success(function(){
        changeUser({
          username: '',
          role: userRoles.public
        });
        success();
      }).error(error);
    },

    accessLevels: accessLevels,
    userRoles: userRoles,
    user: currentUser

  };
});

angular.module('phantomRunnerApp').factory('Users', function($http) {
  return {
    getAll: function(success, error) {
      $http.get('/users').success(success).error(error);
    }
  };
});