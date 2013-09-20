'use strict';



// angular.module('phantomRunnerApp')
// .controller('FAQ', ['$scope', function ($scope){
//   $scope.faq = {
    
//   }
// }]);

angular.module('phantomRunnerApp')
.controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth){
  $scope.user = Auth.user;
  $scope.userRoles = Auth.userRoles;
  $scope.accessLevels = Auth.accessLevels;

  $scope.logout = function() {
    Auth.logout(function(){
      $location.path('/login');
    }, function(){
      $rootScope.error = "Failed to logout";
    });
  };
}]);

angular.module('phantomRunnerApp')
.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
  function($rootScope, $scope, $location, $window, Auth){
    $scope.rememberme = true;
    $scope.login = function() {
      Auth.login({
        username: $scope.username,
        password: $scope.password,
        rememberme: $scope.rememberme
      },
      function(res) {
        $location.path('/');
      },
      function(err) {
        $rootScope.error = "Failed to login";
      });
    };
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);

angular.module('phantomRunnerApp')
.controller('Races', ['$scope', '$http', function ($scope, $http){
  $scope.getRaces = function(){
    $http.get('/races').success(function(data, status){
      console.log("got some races");
      $scope.races = data;
    })
    .error(function(err, status){
      console.log(status, err, "there was an error");
    });
  }
  $scope.getRaces();
  $scope.today = new Date();
}]);

// angular.module('phantomRunnerApp')
// .controller('')


// var sortOn = function(collection, name) {
  //   collection.sort(function (a, b){
  //     if (a[name] <= b[name]) {
  //       return -1;
  //     }
  //     return 1;
  //   });
  // };

  // $scope.groupByMonth = function(attribute) {
  //   $scope.groups = [];
  //   sortOn($scope.races, attribute);

  //   var groupValue = "_INVALID_GROUP_VALUE_";

  //   for (var i = 0; i < $scope.races.length; i++) {
  //     var race = $scope.races[i];
  //     if (race[attribute] !== groupValue) {

  //       var raceGroup = {
  //         label: race[attribute],
  //         races: []
  //       }

  //       groupValue = raceGroup.label;
  //       $scope.groups.push(raceGroup);

  //       raceGroup.races.push(race);

  //     }

  //   }

  // };






























