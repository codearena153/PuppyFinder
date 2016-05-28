angular.module('puppyfinder.result', [])



.controller('ResultController', function ($window, $scope, $sce, RelatedContents) {

    $scope.results = $window.results;

    $scope.init = function(){
      angular.forEach($scope.results, function(dog){
        RelatedContents.getYoutube(dog.breed)
        .then(function(videos){
          dog.relatedVideos = videos;
          // console.log(dog.relatedVideos);
        });

        var hashtag = dog.breed.replace(/ /gi, '');
        console.log(hashtag);

        RelatedContents.getTwitter(hashtag)
        .then(function(photos){
          console.log(photos);
        });
      });
    };

    $scope.getSrc = function(video){
      return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+video.id.videoId);
    };

});
