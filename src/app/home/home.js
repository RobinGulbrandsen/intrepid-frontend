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

.controller( 'HomeCtrl', function HomeController( $scope, $http, userFactory, $cookieStore  ) {
  $scope.loginMsg = "";
  $scope.articles = [];
  $scope.currentUser = userFactory.getUser($cookieStore);

  $scope.login = function() {
    $scope.loginMsg = "Loading, please wait..";
    
    $http({
      method: 'POST', 
      url:    'api/login',
      data:   $scope.formData
    }).success(function(data, status, headers, config) {
        if(data != null) {
          $scope.currentUser = data;  
          userFactory.setUser($cookieStore, data);
        }
    }).error(function(data, status) {
        $scope.loginMsg = "Wrong username or password!";
    });
  };

  $scope.createArticle = function() {
    $http({
      method: 'POST', 
      url:    'api/articles',
      data:   $scope.formData
    }).success(function(data, status, headers, config) {
        $scope.getArticles();
    }).error(function(data, status) {
        $scope.errorCreateArticle = data;
    });
  };

  $scope.getArticles = function() {
    $http({
      method: 'GET', 
      url:    'api/articles'
    }).success(function(data, status, headers, config) {
       $scope.articles = data; 
    });
  };
  $scope.getArticles();

  $scope.deleteArticle = function($id) {
    console.log($id);
    $http({
      method: 'DELETE', 
      url:    'api/articles/' + $id
    }).success(function(data, status, headers, config) {
        $scope.getArticles();
    });
  };

  $scope.redirectToApply = function() {
    $location.path = '#/register';
  };
})
;

