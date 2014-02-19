angular.module( 'intrepidApp.login', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'loginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'loginCtrl', function LoginController( $scope, $http ) {


  $scope.login = function() {
    $formData = {};
    
    $http({
      method: 'POST', 
      url:    'api/login',
      data:   $scope.formData
    })
      .success(function(data, status, headers, config) {
        $scope.console = data;
    });
  };

})
;

