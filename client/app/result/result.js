angular.module('puppyfinder.result', [])



.controller('ResultController', function ($window, $scope, $sce, Related) {

    $scope.results = $window.results;

    $scope.init = function(){
      angular.forEach($scope.results, function(dog){
        Related.getYoutube(dog.breed).then(function(videos){
          dog.relatedVideos = videos;
          // console.log(dog.relatedVideos);
        });
      });
    };

    $scope.getSrc = function(video){
      return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+video.id.videoId);
    };

});
