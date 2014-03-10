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

.controller( 'registerCtrl', function RegisterController( $scope, $http, $location ) {
  $scope.errorPassword = "";
  $scope.errorUsernameOrServer = "";
  $scope.formData = {};

  $scope.register = function() {
    if($scope.formData.username && $scope.formData.password && $scope.formData.password2 && 
            $scope.formData.server && $scope.formData.email) {
      resetErrorMsg();
      
      if($scope.formData.password !== $scope.formData.password2) {
        $scope.errorPassword = "Passwords dont matches";
      } else {
        //check if username and server matches a character without chest and weapons
        $http({
        method: 'POST', 
        url:    'api/register',
        data:   $scope.formData
        })
        .success(function(data, status, headers, config) {
            $location.path('/');
        }).error(function(data, status, headers, config) {
          if(status == 400) {
            $scope.registerError = data;
          } else {
            $scope.registerError = "You broke it!";
          }
        });
      }
    }
  };

  var resetErrorMsg = function() {
    $scope.errorUsernameOrServer = "";
    $scope.errorPassword = "";
  };
})
;