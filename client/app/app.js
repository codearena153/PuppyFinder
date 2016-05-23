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
<<<<<<< c159d209e2e75582d11e1f79f91d9734b952e4f0
        .when('/survey', {
            templateUrl: 'app/survey/survey.html',
            controller: 'SurveyController',
        })
        .when('/result', {
            templateUrl: 'app/result/result.html',
            controller: 'ResultController'
        })
||||||| merged common ancestors
=======
        .when('/survey', {
            templateUrl: 'app/survey/survey.html',
            controller: 'SurveyController',
        })
        .when('/result', {
            templateUrl: 'app/survey/result.html',
            controller: 'ResultController'
        })
>>>>>>> (feat) add contents to intro.html
        .otherwise('/intro');
});