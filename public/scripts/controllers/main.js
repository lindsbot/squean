'use strict';

angular.module('phantomRunnerApp')
  .controller('MainCtrl', function ($scope){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('link', [])
  .controller('activeLink', [$location, function (location){
    return {
      restrict: 'A',
      link: function (scope, element, attrs, controller){

      }

    };
  }]);