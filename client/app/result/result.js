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

        var q = dog.breed.replace(/ /gi, '');
        // console.log(hashtag);

        RelatedContents.getDaum(q)
        .then(function(photos){
          dog.relatedPhotos = photos.data.channel.item;
          console.log(photos);
          // dog.relatedPhotos = photos.data.items;

        });
      });
    };

    $scope.getSrc = function(video){
      return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+video.id.videoId);
    };

    // $scope.getPholarSrc = function(breed){
    //   return $sce.trustAsResourceUrl("http://www.pholar.co/gallery/postTag?tag="+breed);
    // };

});
