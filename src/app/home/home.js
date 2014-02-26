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

.controller( 'HomeCtrl', function HomeController( $scope, $http, $location, userFactory, $cookieStore  ) {
  $scope.loginMsg = "";
  $scope.articles = [];
  $scope.currentUser = userFactory.getUser($cookieStore);

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
})
;

