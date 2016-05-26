var app = angular.module("RemoveApp", []);

app.controller("RemoveController", function($scope, $http) {
  console.log('in RemoveController');
  $http.get("/puppies")
    .success(function(response) {
      console.log("response is ", response);
      $scope.puppies = response;
    });

  $scope.remove = function(breed) {
    $http.delete("/puppies/" + breed)
      .success(function(response) {
        console.log("response is ", response);
        $scope.puppies = response;
      });
  };


})