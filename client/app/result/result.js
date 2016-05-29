angular.module('puppyfinder.result', [])



.controller('ResultController', function ($window, $scope, $sce, RelatedContents) {

    $scope.results = $window.results;

    $scope.init = function(){

      angular.forEach($scope.results, function(dog, index){

        dog.index = index;

        var q = dog.breed.replace(/ /gi, '');

        RelatedContents.getYoutube(q)
        .then(function(videos){
          console.log(videos);
          dog.relatedVideos = videos;
          dog.currentVideo = dog.relatedVideos[0];
          // console.log(dog.relatedVideos);
        });

        RelatedContents.getDaum(q)
        .then(function(photos){
          dog.relatedPhotos = photos.data.channel.item;
          console.log(photos);
          // dog.relatedPhotos = photos.data.items;
        });
      });
    };

    $scope.tab = 0;

    $scope.setTab = function(tabIndex){
      $scope.tab = tabIndex;
    };

    $scope.getSrc = function(video){
      return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+video.id.videoId);
    };

    $scope.play = function(dog, video){
      dog.currentVideo = video;
    };

    // $scope.getPholarSrc = function(breed){
    //   return $sce.trustAsResourceUrl("http://www.pholar.co/gallery/postTag?tag="+breed);
    // };

});
