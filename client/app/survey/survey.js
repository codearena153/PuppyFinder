angular.module('puppyfinder.survey', [])

.controller('SurveyController', function ($scope, $window, $location, $http, QuestionList) {
    $scope.questions = QuestionList.questions;
    $scope.data = {
        puppyData : {}
    };

    $scope.debug = function() {
        console.log("Survey received: ", $scope.data.puppyData);
    };

    $scope.sendQuery = function() {
        return $http.post('/search', survey)
        .success(function(res) {
            // some code
        });
    };
});

