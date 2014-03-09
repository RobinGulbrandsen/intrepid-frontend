angular.module( 'intrepidApp.forum', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'forum', {
    url: '/forum',
    views: {
      "main": {
        controller: 'forumCtrl',
        templateUrl: 'forum/forum.tpl.html'
      }
    },
    data:{ pageTitle: 'Forum' }
  });
})

.controller( 'forumCtrl', function RegisterController( $scope, $http ) {
  $scope.categoryGroups = "";

  $http({
    method: 'GET', 
    url:    'api/forum'
  }).success(function(data, status, headers, config) {
      $scope.categoryGroups = data;
  }).error(function(data, status) {
      console.log(data);
  });

  $scope.redirectToTopic = function(id) {
    var url = "#/forum/" + id;
    window.location.href = url;
  };

});