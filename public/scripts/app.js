'use strict';

angular.module('phantomRunnerApp', [])
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
