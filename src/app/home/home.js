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
  $scope.articles = null;
  $scope.currentUser = userFactory.getUser($cookieStore);
  $scope.editVisible = false;

  $scope.hideNewArticle = function() {
    $scope.editVisible = false;
  };

  $scope.showNewArticle = function() {
    $scope.editVisible = true;
  };

  $scope.createArticle = function() {
    $http({
      method: 'POST', 
      url:    'api/articles',
      data:   $scope.formData
    }).success(function(data, status, headers, config) {
        $scope.formData = {
          content: ""
        };
        $scope.editVisible = false;
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
  if($scope.articles == null) {
    $scope.getArticles();  
  }
  
  
  $scope.deleteArticle = function($id) {
    var answer = confirm("Are you sure you want to delete article");
    if(answer === true) {
      $http({
        method: 'DELETE', 
        url:    'api/articles/' + $id
      }).success(function(data, status, headers, config) {
          $scope.getArticles();
      });  
    }
  };
})
;

