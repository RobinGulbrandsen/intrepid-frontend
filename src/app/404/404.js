angular.module( 'intrepidApp.404', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( '404', {
    url: '/404',
    views: {
      "main": {
        controller: '404Ctrl',
        templateUrl: '404/404.tpl.html'
      }
    },
    data:{ pageTitle: '404' }
  });
})

.controller( '404Ctrl', function HomeController( $scope ) {
  
})
;

