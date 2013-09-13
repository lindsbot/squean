'use strict';

angular.module('phantomRunnerApp');
angular.module('link', [])
  .directive('activeLink', [$location, function (location){
    return {
      restrict: 'A',
      link: function (scope, element, attrs, controller){
        var myClass = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1);
        scope.location = location;

        scope.$watch('location.path()', function (newPath){
          if (path === newPath) {
            element.addClass(myClass);
          } else {
            element.removeClass(myClass);
          }
        });
      }
    };
  }]);

  //   .controller('MainCtrl', '$scope', function ($scope){
  //   $scope.awesomeThings = [
  //     'HTML5 Boilerplate',
  //     'AngularJS',
  //     'Karma'
  //   ];
  // })