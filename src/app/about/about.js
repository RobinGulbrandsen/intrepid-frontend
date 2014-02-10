angular.module( 'intrepidApp.about', [
  'ui.state',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about?server&character',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'Character Info' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, $stateParams, $http ) {
  $scope.server = $stateParams.server;
  $scope.characterId = $stateParams.character;
  $scope.characterData = "";
  $scope.fetchingData = "Fetching data from Blizz' server";

  $http({method: 'GET', url: 'api/armory/users/' + $scope.server + '/' + $scope.characterId}).
  success(function(data, status, headers, config) {
    $scope.characterData = data;
    $scope.fetchingData = "";
  }).
  error(function(data, status, headers, config) {
    console.log("Error - " + status);
  });
})

;
