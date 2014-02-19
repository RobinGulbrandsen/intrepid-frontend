angular.module( 'intrepidApp.members', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'members', {
    url: '/members',
    views: {
      "main": {
        controller: 'MembersCtrl',
        templateUrl: 'members/members.tpl.html'
      }
    },
    data:{ pageTitle: 'Members' }
  });
})

.controller( 'MembersCtrl', function HomeController( $scope ) {
  $scope.members = null;
  $http({method: 'GET', url: 'api/armory/users'}).
  success(function(data, status, headers, config) {
    $scope.members = data;
  }).
  error(function(data, status, headers, config) {
    $http({method: 'GET', url: '../src/app/home/home.json'}).
    success(function(data, status, headers, config) {
      $scope.members = data;
    });
  });
})

;

