var app = angular.module("UpdateApp", []);

app.controller("UpdateController", function($scope, $http) {
  
  $scope.allergic = [[true, '많음'], [false, '적음']];
  $scope.absent = [[true, '가능'], [false, '불가능']];
  $scope.active = [[true, '활동적'], [false, '보통']];
  $scope.single = [[true, '혼자 잘 지냄'], [false, '외로움을 잘탐']];
  $scope.friendly = [["true", '강함'], ["false", '약함'], ["default", '보통']];
  $scope.inside = [['true', '실내'], ['false', '실외'], ['default', '상관없음']];
  //$scope.initialCost = [['p0-10', ' 10만원 이하'], ['p10-20', '10만원~20만원'], ['p20-50', '20만원~50만원'], ['p50-100', '50만원~100만원'], ['p100-500', '100만원~500만원'], ['p500-1000', '500만원~1000만원'], ['p1000', '1000만원 이상']];
  //$scope.maintenance = [['c0-10', ' 10만원 이하'], ['c10-20', '10만원~20만원'], ['c20-30', '20만원~30만원'], ['c30-50', '30만원~50만원'], ['c50-100', '50만원~100만원'], ['c100', '100만원 이상']];

  $http.get("/puppies")
    .success(function(response) {
      console.log("response is ", response);
      $scope.puppies = response;
    });


  $scope.select = function(breed) {
    console.log('in select, breed is ', breed);
    $http.get("/puppies/" + breed) 
      .success(function(response) {
        console.log('selected item is ', response);
        $scope.puppy = response;
      })
  };

  $scope.update = function(puppy) {
    $http.put("/puppies/" + puppy._id, puppy) 
      .success(function(response) {
        console.log("changed info is ", response);
        $scope.puppy = response;
      });  
  };


})