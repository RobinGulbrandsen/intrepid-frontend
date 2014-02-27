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

.controller( 'MembersCtrl', function HomeController( $scope, $http ) {
  $scope.members = "";
  $http({method: 'GET', url: 'api/armory/users'}).
  success(function(data, status, headers, config) {
    $scope.members = data;
  }).
  error(function(data, status, headers, config) {
    console.log(status);
  });

  $scope.redirectToMember = function(name) {
    var url = "#/about?server=Ravencrest&character=" + name;
    window.location.href = url;
  };

})

;

