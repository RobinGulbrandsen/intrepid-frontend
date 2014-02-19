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

.controller( 'registerCtrl', function RegisterController( $scope, $http ) {
  $scope.errorPassword = "";
  $scope.errorUsernameOrServer = "";
  $scope.formData = {};

  $scope.register = function() {
    if($scope.formData.username && $scope.formData.password && $scope.formData.password2 && $scope.formData.server) {
      resetErrorMsg();
      
      if($scope.formData.password !== $scope.formData.password2) {
        $scope.errorPassword = "Passwords dont matches";
      } else {
        //check if username and server matches a character without chest and weapons
        $http({
        method: 'POST', 
        url:    'api/authenticate',
        data:   $scope.formData
        })
        .success(function(data, status, headers, config) {
          console.log("registered!");
        })
        .error(function(data, status, headers, config) {
          if(status == 404) {
            $scope.errorUsernameOrServer = "Could not find " + $scope.formData.username + " on " + $scope.formData.server;
          } else {
            $scope.errorUsernameOrServer = "You broke it!";
          } 
        });
      }
    } else {
      console.log($scope.formData);
    }
  };

  var resetErrorMsg = function() {
    $scope.errorUsernameOrServer = "";
    $scope.errorPassword = "";
  };
})
;