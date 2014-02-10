angular.module( 'intrepidApp.home', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeController( $scope, $http ) {

  $scope.members = null;
  $http({method: 'GET', url: 'api/armory/users'}).
  success(function(data, status, headers, config) {
    $scope.members = data;
  }).
  error(function(data, status, headers, config) {
    console.log("Error - " + status);
  });
})
;

