'use strict';



// angular.module('yourAppHere')
// .controller('FAQ', ['$scope', function ($scope){
//   $scope.faq = {
    
//   }
// }]);

angular.module('yourAppHere')
.controller('NavCtrl', ['$scope', '$rootScope','$location', 'Auth', function($scope, $rootScope, $location, Auth){

  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.user = Auth.user;
  $scope.userRoles = Auth.userRoles;
  $scope.accessLevels = Auth.accessLevels;
  if ($scope.user.length > 4){
    console.log("hello");
  }

  $scope.logout = function() {
    Auth.logout(function(){
      $location.path('/login');
    }, function(){
      $rootScope.error = "Failed to logout";
    });
  };

}]);

angular.module('yourAppHere')
.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function() {
        Auth.register({
                username: $scope.email,
                password: $scope.password,
                role: $scope.role
            },
            function() {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);

angular.module('yourAppHere')
.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
  function($rootScope, $scope, $location, $window, Auth){
    $scope.rememberme = true;
    $scope.alerts = [];
    $scope.login = function() {
      Auth.login({
        username: $scope.email,
        password: $scope.password,
        rememberme: $scope.rememberme
      },
      function(res) {
        console.log(res);
        $location.path('/');
      },
      function() {
        $scope.alerts.push({ type: 'error', msg: 'Invalid username/password combination' });
        $rootScope.error = 'Failed to login';
      });
    };

  }]);