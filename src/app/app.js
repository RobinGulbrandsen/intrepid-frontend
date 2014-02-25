angular.module( 'intrepidApp', [
  'ngCookies',
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

//shared factory with functions for session controll
.factory('userFactory', function() {
    return {
        getUser: function($cookieStore) {
            return $cookieStore.get("currentUser");
        },
        setUser: function($cookieStore, $data) {
          $cookieStore.put("currentUser", $data);
        }
    };
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $http, userFactory, $cookieStore ) {
  //get currentUser from cookie
  $scope.currentUser = userFactory.getUser($cookieStore);

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.simplePageTitle = toState.data.pageTitle;
      $scope.pageTitle = toState.data.pageTitle + ' | Intrepid Gaming' ;
    }
  });
})
;

