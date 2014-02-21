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
  console.log("workign");
});