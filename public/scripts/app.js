'use strict';


angular.module('yourAppHere', ['ngCookies', 'ui.bootstrap'])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    // accessLevels: public, user, race_manager, admin
    var access = routesConfig.accessLevels;

    $routeProvider
      .when('/', {
        templateUrl: './views/main.html',
        access: access.user
      })
      .when('/login', {
        templateUrl: './views/login.html',
        access: access.anon
      })
      .when('/how', {
        templateUrl: './views/how.html',
        access: access.user
      })
      .when('/admin', {
        templateUrl: './views/admin.html',
        access: access.admin
      })
      .when('/faq', {
        templateUrl: './views/faq.html',
        access: access.user
      })
      .when('/contact', {
        templateUrl: './views/contact.html',
        access: access.user
      })
      .otherwise({
        redirectTo: '/',
        access: access.user
      });

      var interceptor = ['$location', '$q', function($location, $q) {
        function success(response) {
          return response;
      }

      function error(response) {

      if(response.status === 401) {
        $location.path('/login');
        return $q.reject(response);
      }
      else {
        return $q.reject(response);
        }
      }

      return function(promise) {
        return promise.then(success, error);
        };
      }];

      $httpProvider.responseInterceptors.push(interceptor);


















  }])
    .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
              console.log('SCOPE USER ',$rootScope.$root);
              if (Auth.isLoggedIn($rootScope)) { $location.path('/'); }
              else { $location.path('/login'); }

            }
        });

    }]);
