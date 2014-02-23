angular.module( 'intrepidApp', [
  'templates-app',
  'templates-common',
  'intrepidApp.404',
  'intrepidApp.about',
  'intrepidApp.forum',
  'intrepidApp.home',
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


  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.simplePageTitle = toState.data.pageTitle;
      $scope.pageTitle = toState.data.pageTitle + ' | Intrepid Gaming' ;
    }
  });
  

})

;

