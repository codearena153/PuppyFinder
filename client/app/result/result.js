angular.module('puppyfinder.result', [])



.controller('ResultController', function ($rootScope, $scope, $sce, Related) {
    //Http.getResults를 사용해서 결과 요청 > $rootScope 변수에 담기 (array 형태?)
    $rootScope.results = [{breed: '코카 스파니엘'}, {breed: '골든 리트리버'}, {breed: '시베리안 허스키'}];

    $scope.init = function(){
      angular.forEach($rootScope.results, function(dog){
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
