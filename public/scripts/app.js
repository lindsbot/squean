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
      .when('/races', {
        templateUrl: './views/races.html'
      })
      .when('/faq', {
        templateUrl: './views/faq.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
