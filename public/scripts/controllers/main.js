'use strict';

angular.module('phantomRunnerApp')
.controller('Races', ['$scope', '$http', function ($scope, $http){
  // $scope.races = GET RACES FROM DB
  // $scope.races = $http.get('/races').success(function(data){
  //   console.log(data);
  // })
  // .error(function(err, status){
  //   console.log(status, err, "there was an error");
  // });
  $scope.today = new Date();
}]);