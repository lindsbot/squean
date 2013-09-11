'use strict';

angular.module('phantomRunnerApp')
  .controller('TestCtrl', ['$http', '$scope', function($http, $scope) {

    $scope.getUsers = function(){
      $http({
        method: 'GET',
        url: 'http://localhost:3000/test'
      })
      .success(function(stuff, status){
        $scope.data = stuff;
        console.log(status, stuff);
      })
      .error(function(error, status){
        console.log(status, 'there was an error!', error);
      });
    };

    $scope.getUsers();
  }]);

    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];