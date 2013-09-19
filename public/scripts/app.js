'use strict';

angular.module('phantomRunnerApp', ['ngCookies'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider' function ($routeProvider, $locationProvider, $httpProvider) {

    // roles: public, user, director, admin 
    var access = routesConfig.accessLevels;

    $routeProvider
      .when('/', {
        templateUrl: './views/main.html',
        access: access.public
      })
      .when('/login', {
        templateUrl: './views/login.html',
        access: access.public
      })
      .when('/how', {
        templateUrl: './views/how.html',
        access: access.public
      })
      .when('/admin', {
        templateUrl: './views/admin.html',
        access: access.admin
      })
      .when('/races', {
        templateUrl: './views/races.html',
        access: access.public
      })
      .when('/faq', {
        templateUrl: './views/faq.html',
        access: access.public
      })
      .when('/contact', {
        templateUrl: './views/contact.html',
        access: access.public
      })
      .otherwise({
        redirectTo: '/',
        access: access.public
      });
  }]);
