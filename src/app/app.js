angular.module( 'intrepidApp', [
  'templates-app',
  'templates-common',
  'intrepidApp.404',
  'intrepidApp.about',
  'intrepidApp.forum',
  'intrepidApp.home',
  'intrepidApp.login',
  'intrepidApp.members',
  'intrepidApp.register',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http ) {
  $scope.currentUser = null;
  $scope.loginMsg = "";

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Intrepid Gaming' ;
    }
  });
  
  $scope.login = function() {
    $scope.loginMsg = "Loading, please wait..";
    
    $http({
      method: 'POST', 
      url:    'api/login',
      data:   $scope.formData
    }).success(function(data, status, headers, config) {
        if(data != null) {
          $scope.currentUser = data;  
        }
    }).error(function(data, status) {
        $scope.loginMsg = "Wrong username or password!";
    });
  };
})

;

