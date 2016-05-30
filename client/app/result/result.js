angular.module('puppyfinder.result', [])

.controller('ResultController', function ($window, $scope, $sce, RelatedContents) {
  /* Put results from survey.js in window scope into this scope's results variable */
  $scope.results = $window.results;
  /* Initialize method when ResultController is loaded in the DOM */
  $scope.init = function(){
    angular.forEach($scope.results, function(dog){
      /* Remove whitespaces in dog.breed string */
      var q = dog.breed.replace(/ /gi, '');
      /* Request related videos to Youtube */
      RelatedContents.getYoutube(q)
      .then(function(videos){
        dog.relatedVideos = videos;
        /* Set the first video in the player(iframe) */
        dog.currentVideo = dog.relatedVideos[0];
      });
      /* Request related photos to Daum Image Search */
      RelatedContents.getDaum(q)
      .then(function(photos){
        dog.relatedPhotos = photos.data.channel.item;
      });
    });
  };

  $scope.tab = 0;
  /* Set the tabIndex to see the RelatedContents related breed selected */
  $scope.setTab = function(tabIndex){
    $scope.tab = tabIndex;
  };
  /* Confirm that video source can be trusted */
  $scope.getSrc = function(video){
    return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+video.id.videoId);
  };
  /* Change the video in iframe(player) */
  $scope.play = function(dog, video){
    dog.currentVideo = video;
  };

});
