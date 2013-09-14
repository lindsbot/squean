'use strict';

angular.module('phantomRunnerApp')
.controller('Races', ['$scope', '$http', function ($scope, $http){
  $scope.getRaces = function(){
    $http.get('/races').success(function(data, status){
      console.log(data);
      $scope.races = data;
    })
    .error(function(err, status){
      console.log(status, err, "there was an error");
    });
  }
  $scope.getRaces();

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

  $scope.today = new Date();
}]);

angular.module('phantomRunnerApp')
.controller('FAQ', ['$scope', function ($scope){
  $scope.faq = {
    
  }

}]);































