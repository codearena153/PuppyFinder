var app = angular.module("AddApp", []);

app.controller("AddController", function($scope, $http, $window) {
  $scope.allergic = [['true', '많음'], ['false', '적음']];
  $scope.absent = [['true', '가능'], ['false', '불가능']];
  $scope.active = [['true', '활동적'], ['false', '보통']];
  $scope.single = [['true', '혼자 잘 지냄'], ['false', '외로움을 잘탐']];
  $scope.friendly = [['true', '강함'], ['false', '약함'], ['default', '보통']];
  $scope.inside = [['true', '실내'], ['false', '실외'], ['default', '상관없음']];

  $scope.inputShow = true;
  $scope.tableShow = false;

  $scope.add = function(puppy) {
    $scope.inputShow = !$scope.inputShow;
    $scope.tableShow = !$scope.tableShow;

    $http.post("/result", puppy)
      .success(function(response) {
        console.log("Just added: ", response);
        $scope.puppy = response;
      });
  };

  $scope.goback = function() {
    console.log("in goback function");
    $window.location.href = '/admin';
  };
});