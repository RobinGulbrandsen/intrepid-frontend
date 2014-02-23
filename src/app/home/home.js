angular.module( 'intrepidApp.home', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeController( $scope, $http ) {
  $scope.currentUser ="";
  $scope.loginMsg = "";

  $scope.login = function() {
    $scope.loginMsg = "Loading, please wait..";
    
    $http({
      method: 'POST', 
      url:    'api/login',
      data:   $scope.formData
    }).success(function(data, status, headers, config) {
        if(data != null) {
          $scope.currentUser = data;  
        }
    }).error(function(data, status) {
        $scope.loginMsg = "Wrong username or password!";
    });
  };

  $scope.redirectToApply = function() {
    $location.path = '#/register';
  };
})
;

