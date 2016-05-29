angular.module('puppyfinder.survey', [])

.controller('SurveyController', function ($scope, $window, $location, $http, QuestionList, Result) {
    $scope.questions = QuestionList.questions;
    $scope.data = {
        puppyData : {}
    };
    
    $scope.topIndex = 0;
    // $scope.debug = function() {
    //     console.log("Survey received: ", $scope.data.puppyData);
    // };

    // var survey = $scope.data.puppyData;
    // console.log("updated survey data: ", survey);

    $scope.sendQuery = function() {
      Result.getResults($scope.data.puppyData)
      .then(function(resp){
        $window.results = resp.data;
        return 1;
      })
      .then(function(ok){
        $location.path('/result');
      });
    };

    $scope.width = window.innerWidth;
    $scope.height = window.innerHeight;

    $scope.scrollTo = function(index){
      $scope.topIndex = index;
    };
});
