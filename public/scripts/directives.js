'use strict';

angular.module('yourAppHere')
  .directive('accessLevel', ['Auth', function(Auth){
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var prevDisp = element.css('display');
        var userRole;
        var accessLevel;

        $scope.user = Auth.user;
        $scope.$watch('user', function(user){
          if (user.role) {
            userRole = user.role;
            updateCSS();
          }
        }, true);

        attrs.$observe('accessLevel', function(al){
          if (al) {
            accessLevel = $scope.$eval(al);
          }
          updateCSS();
        });

        var updateCSS = function() {
          if(userRole && accessLevel) {
            if(!Auth.authorize(accessLevel, userRole)) {
              element.css('display', 'none');
            }
            else {
              element.css('display', prevDisp);
            }
          }
        }
      }
    }
  }]);