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
})

;

