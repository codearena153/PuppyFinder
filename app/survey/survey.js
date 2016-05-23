angular.module('puppyfinder.survey', [])

.controller('SurveyController', function ($scope, $window, $location) {
    $scope.questions = [];

    for (var i = 0 ; i < 10 ; i++) {
        var question = {};
        question.title = "Title #" + (i+1);
        question.content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        $scope.questions.push(question);
    }
});