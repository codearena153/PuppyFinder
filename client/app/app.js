angular.module('puppyfinder', [
    'puppyfinder.intro',
    'puppyfinder.survey',
    'puppyfinder.result',
    'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/intro/intro.html',
            controller: 'IntroController'
        })
        .when('/intro', {
            templateUrl: 'app/intro/intro.html',
            controller: 'IntroController'
        })
        .when('/survey', {
            templateUrl: 'app/survey/survey.html',
            controller: 'SurveyController',
        })
        .when('/result', {
            templateUrl: 'app/result/result.html',
            controller: 'ResultController'
        })
        .otherwise('/intro');
});