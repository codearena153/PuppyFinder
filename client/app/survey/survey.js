angular.module('puppyfinder.survey', [])

.controller('SurveyController', function ($scope, $window, $location, $http, QuestionList) {
    $scope.questions = QuestionList.questions;
    console.log("Does QuestionList Factory work? ", QuestionList.questions);

    var survey = {
        allergic: "true",
        friendly: "false"
    };

    $scope.sendQuery = function() {
        return $http.post('/search', survey)
        .success(function(res) {
            // some code
        });
    };
});