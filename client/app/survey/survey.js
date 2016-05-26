angular.module('puppyfinder.survey', [])

.controller('SurveyController', function ($scope, $window, $location, $http, QuestionList) {
    $scope.questions = QuestionList.questions;
    $scope.data = {
        puppyData : {}
    };

    // $scope.debug = function() {
    //     console.log("Survey received: ", $scope.data.puppyData);
    // };

    // var survey = $scope.data.puppyData;
    // console.log("updated survey data: ", survey);

    $scope.sendQuery = function() {
        return $http.post('/search', $scope.data.puppyData)
        .success(function(res) {
            console.log("sendQuery - success - res: ", res);
            var results = res;
        });
    };
});

