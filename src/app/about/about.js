angular.module( 'intrepidApp.about', [
  'ui.state',
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
    if(status == 404) {
      $scope.fetchingData = "404 - The character was not found";
    } else {
      $scope.fetchingData = "500 - You broke it! Now, grab your ankles!";
    }
  });
})

;
