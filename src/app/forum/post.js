angular.module( 'intrepidApp.post', [
  'ui.state'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'post', {
    url: '/forum/:categoryId/:topicId',
    views: {
      "main": {
        controller: 'postCtrl',
        templateUrl: 'forum/post.tpl.html'
      }
    },
    data:{ pageTitle: 'Forum' }
  });
})

.controller( 'postCtrl', function RegisterController( $scope, $http, $stateParams, userFactory, $cookieStore ) {

  var topicId = $stateParams.topicId;
  var categoryId = $stateParams.categoryId;
  
  $scope.currentUser = userFactory.getUser($cookieStore);
  $scope.posts = "";
  $scope.serverResponce = {};
  $scope.writeResponseVisible = false;
  $scope.editTopicVisible = false;
  $scope.editPostVisible = [];

  $scope.redirectToTopic = function() {
    var url = "#/forum/" + $stateParams.categoryId;
    window.location.href = url;
  };

  $scope.firstPage = function() {
    console.log("first");
  };

  $scope.previousPage = function() {
    console.log("previousPage");
  };

  $scope.nextPage = function() {
    console.log("nextPage");
  };

  $scope.lastPage = function() {
    console.log("lastPage");
  };

  $scope.enableResponse = function() {
    $scope.writeResponseVisible = true;
  };

  $scope.editTopicShow = function() {
    $scope.editTopicVisible = true;
  };

  $scope.editPostShow = function(id) {
    $scope.editPostVisible[id] = true;
  };

  $scope.disableResponse = function() {
    $scope.formData = {};
    $scope.writeResponseVisible = false;
  };

  $scope.editTopicHide = function() {
    $scope.editTopicVisible = false;
  };

  $scope.editPostHide = function(id) {
    $scope.editPostVisible[id] = false;
  };

  $scope.postForm = function() {
    var error = false;
    $scope.contentError = "";

    if($scope.formData.content == null || $scope.formData.content === "") {
      $scope.contentError = "Content must be filled in";
      error = true;
    }

    if(!error) {
      $http({
      method: 'POST', 
      url:    'api/forum/' + $stateParams.categoryId + '/' + topicId,
      data:   $scope.formData
      }).success(function(data, status, headers, config) {
        $scope.formData = {};
        $scope.disableResponse();
        update();
      }).error(function(data, status, headers, config) {
          $scope.serverError = data.error.message;
      }); 
    }
  };

  $scope.deleteTopic = function() {
    var answer = confirm("Are you sure you want to delete post?"); 
    if(answer === true) {
      $http({
      method: 'DELETE', 
      url:    'api/forum/' + categoryId + '/' + topicId,
      data:   $scope.serverResponce
      }).success(function(data, status, headers, config) {
          $scope.redirectToTopic();
      }).error(function(data, status) {
        alert(data.error.message);
      });
    }   
  };

  $scope.deletePost = function(id) {
    var answer = confirm("Are you sure you want to delete post?");
    if(answer === true) {
      $http({
      method: 'DELETE', 
      url:    'api/forum/' + categoryId + '/' + topicId + '/' + id
      }).success(function(data, status, headers, config) {
          update();
      }).error(function(data, status) {
          alert(data.error.message);
      });
    }
  };

  $scope.updateTopic = function() {
    var error = false;
    $scope.contentError = "";

    if($scope.serverResponce.content == null || $scope.serverResponce.content === "") {
      error = true;
      $scope.contentError = "Post requires content";
    }

    if(!error) {
      $http({
      method: 'POST', 
      url:    'api/forum/' + categoryId + '/update',
      data:   $scope.serverResponce
      }).success(function(data, status, headers, config) {
          $scope.editTopicHide();
      }).error(function(data, status) {
          $scope.serverError = data.error.message;
      });
    }

  };

  $scope.updatePost = function(id) {
    var post = $scope.serverResponce.posts[id];
    var error = false;
    $scope.contentError = "";

    if($scope.serverResponce.content == null || $scope.serverResponce.content === "") {
      error = true;
      $scope.contentError = "Post requires content";
    }

    if(!error) {
      $http({
      method: 'POST', 
      url:    'api/forum/' + categoryId + '/' + topicId + '/update',
      data:   post
      }).success(function(data, status, headers, config) {
          $scope.editPostHide(id);
      }).error(function(data, status) {
          $scope.serverError = data.error.message;
      });
    }

  };

  var update = function() {
    $http({
    method: 'GET', 
    url:    'api/forum/' + $stateParams.categoryId + '/' + topicId
    }).success(function(data, status, headers, config) {
        $scope.serverResponce = data[0];

        $scope.editPostVisible = [];
        for(var i = 0; i < data[0].posts.length; i++) {
          $scope.editPostVisible[i] = false;
        }
    }).error(function(data, status) {
        console.log(data);
    });
  };
  update();

});