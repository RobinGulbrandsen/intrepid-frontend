angular.module( 'intrepidApp.topic', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'topic', {
    url: '/forum/:categoryId',
    views: {
      "main": {
        controller: 'topicCtrl',
        templateUrl: 'forum/topic.tpl.html'
      }
    },
    data:{ pageTitle: 'Forum' }
  });
})

.controller( 'topicCtrl', function RegisterController( $scope, $http, $stateParams, userFactory, $cookieStore ) {
  $scope.currentUser = userFactory.getUser($cookieStore);
  $scope.topics = "";
  $scope.topicNewActive = false;

  var categoryId = $stateParams.categoryId;

  $scope.formData = {};

  $scope.redirectToPost = function(postId) {
    var url = "#/forum/" + categoryId + "/" + postId;
    window.location.href = url;
  };

  $scope.redirectToForum = function() {
    var url = "#/forum";
    window.location.href = url;
  };

  $scope.createNew = function() {
    $scope.topicNewActive = true;
  };

  $scope.cancelNew = function() {
    $scope.topicNewActive = false;
  };

  $scope.sendForm = function() {
    var error = false;
    $scope.titleError = "";
    $scope.contentError = "";
    $scope.serverError = "";
    if($scope.formData.title == null || $scope.formData.title === "") {
      $scope.titleError = "Title can't be blank";
      error = true;
    }

    if($scope.formData.content == null || $scope.formData.content === "") {
      $scope.contentError = "Content can't be blank";
      error = true;
    }

    if(error === false) {
      $http({
      method: 'POST', 
      url:    'api/forum/' + $stateParams.categoryId,
      data:   $scope.formData
      }).success(function(data, status, headers, config) {
        $scope.formData = {};
        $scope.topicNewActive = false;
        updateTopics();
      }).error(function(data, status, headers, config) {
          $scope.serverError = data.error.message;
      });  
    }
  };

  var updateTopics = function() {
    $http({
    method: 'GET', 
    url:    'api/forum/' + $stateParams.categoryId
    }).success(function(data, status, headers, config) {
      $scope.topics = data;
    }).error(function(data, status) {
      alert(data);
    });
  };
  updateTopics();
});