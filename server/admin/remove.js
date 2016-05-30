var app = angular.module("RemoveApp", []);

app.controller("RemoveController", function($scope, $http) {
  $http.get("/puppies")
    .success(function(response) {
      $scope.puppies = response;
    });

  $scope.remove = function(breed) {
    $http.delete("/puppies/" + breed)
      .success(function(response) {
        console.log("Delete succeded. ");
        $scope.puppies = response;
      });
  };
});