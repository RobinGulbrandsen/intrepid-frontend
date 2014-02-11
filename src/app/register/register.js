angular.module( 'intrepidApp.register', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'registerCtrl',
        templateUrl: 'register/register.tpl.html'
      }
    },
    data:{ pageTitle: 'Register' }
  });
})

.controller( 'registerCtrl', function HomeController( $scope ) {

  $scope.register = function() {
    if($scope.username && $scope.password && $scope.password2) {
      if($scope.password == $scope.password2) {
        
      }
    }
  };
})
;

