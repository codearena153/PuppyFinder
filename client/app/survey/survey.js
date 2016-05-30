angular.module('puppyfinder.survey', [])

.controller('SurveyController', function($scope, $window, $location, QuestionList, Result) {
  /* Get the question list from the factory and insert into this scope */
	$scope.questions = QuestionList.questions;

  /* Container for user's answers to survey */
  $scope.data = {
		puppyData: {}
	};

  /* Method to send user's answers to the server and get results */
  $scope.sendQuery = function() {
    Result.getResults($scope.data.puppyData)
      .then(function(resp) {
        /* Put results in the window scope container set in the AppController  */
        $window.results = resp.data;
        return "success";
      })
      .then(function(success) {
        $location.path('/result');
      });
  };

  /* Default settings for styling */
	$scope.topIndex = 0;
  $scope.width = window.innerWidth;
	$scope.height = window.innerHeight;

  /* Method to move(scroll) to the next question by changing topIndex in the scroll container */
	$scope.scrollTo = function(index) {
		$scope.topIndex = index;
	};
});
