'use strict';

angular.module('phantomRunnerApp', [
  // 'phantomRunnerApp.services',
  // 'phantomRunnerApp.directives',
  // 'phantomRunnerApp.filters',
  // 'phantomRunnerApp.controllers'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: './views/main.html'
      })
      .when('/login', {
        templateUrl: './views/login.html'
      })
      .when('/how', {
        templateUrl: './views/how.html'
      })
      .when('/admin', {
        templateUrl: './views/admin.html'
      })
      .when('/races', {
        templateUrl: './views/races.html'
      })
      .when('/faq', {
        templateUrl: './views/faq.html'
      })
      .when('/contact', {
        templateUrl: './views/contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
