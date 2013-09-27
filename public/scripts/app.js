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
        access: access.public
      })
      .when('/how', {
        templateUrl: './views/how.html',
        access: access.public
      })
      .when('/admin', {
        templateUrl: './views/admin.html',
        access: access.admin
      })
      .when('/faq', {
        templateUrl: './views/faq.html',
        access: access.public
      })
      .when('/contact', {
        templateUrl: './views/contact.html',
        access: access.public
      })
      .otherwise({
        redirectTo: '/',
        access: access.public
      });
  }])
    .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
              if (Auth.isLoggedIn(Auth.user)) {
                $location.path('/');
              }
              else {
                $location.path('/login');
              }

            }
        });

    }]);
