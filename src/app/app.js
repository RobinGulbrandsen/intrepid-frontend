angular.module( 'intrepidApp', [
  'textAngular',
  'ngCookies',
  'templates-app',
  'templates-common',
  'intrepidApp.404',
  'intrepidApp.about',
  'intrepidApp.forum',
  'intrepidApp.home',
  'intrepidApp.members',
  'intrepidApp.post',
  'intrepidApp.register',
  'intrepidApp.topic',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

//shared factory with functions for session controll
.factory('userFactory', function() {
    return {
        getUser: function($cookieStore) {
            return $cookieStore.get("currentUser");
        },
        setUser: function($cookieStore, data) {
          $cookieStore.put("currentUser", data);
        },
        login: function($scope, $http, $location, $cookieStore) {
          if($scope.formData.username != null) {
            $scope.formData.username = $scope.formData.username.toLowerCase();
            $scope.formData.username = $scope.formData.username.charAt(0).toUpperCase() + 
                                        $scope.formData.username.slice(1);
          }
          $http({
            method: 'POST', 
            url:    'api/login',
            data:   $scope.formData
          }).success(function(data, status, headers, config) {
            $scope.currentUser = data;
            $cookieStore.put("currentUser", data);
            $scope.loginMsg = "";    
            $scope.formData = {};
          }).error(function(data, status) {
            $scope.loginMsg = data;  
          });
        },
        logout: function($scope, $http, $location, $cookieStore) {

          $http({
            method: 'POST', 
            url:    'api/logout',
            data:   $scope.formData
          }).success(function(data, status, headers, config) {
              $scope.currentUser = null;  
              $cookieStore.put("currentUser", null);
              window.location.href = "/";
          }).error(function(data, status) {
              console.log(data);
          });

        }
    };
 })

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http, userFactory, $cookieStore ) {
  //get currentUser from cookie
  $scope.currentUser = userFactory.getUser($cookieStore);
  $scope.formData = "";

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.simplePageTitle = toState.data.pageTitle;
      $scope.pageTitle = toState.data.pageTitle + ' | Intrepid Gaming' ;
    }
  });

  $scope.login = function() {
    $scope.loginMsg = "Loading, please wait..";
    var returnValues = userFactory.login($scope, $http, $location, $cookieStore);
  };

  $scope.logout = function() {
    userFactory.logout($scope, $http, $location, $cookieStore);
  };

  $scope.redirectToApply = function() {
    $location.path('/register');
  };

})
;

