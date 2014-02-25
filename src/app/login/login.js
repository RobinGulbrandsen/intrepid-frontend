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

.controller( 'loginCtrl', function LoginController( $scope, $http, userFactory, $cookieStore ) {

  //get currentUser from cookie
  //$scope.currentUser = userFactory.getUser();
  console.log("call in loginCtrl");

  $scope.login = function() {
    $formData = {};
    
    $http({
      method: 'POST', 
      url:    'api/login',
      data:   $scope.formData
    })
      .success(function(data, status, headers, config) {
        userFactory.setUser($cookieStore, data);
        $scope.currentUser = data;
    });
  };

})
;

