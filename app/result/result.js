angular.module('puppyfinder.result', [])

.factory('Http', function($http){

  var getResults = function(){
    // 서버에 survey 결과 요청하는 function
  };

  var getYoutube = function(query){
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        part: 'snippet',
        key: 'AIzaSyBRXCXvGfojUxaVxBYannVo38Vzgj5W_fs',
        q: query,
        maxResults: 10,
        type: video,
        videoEmbeddable: true
      },
    })
    .then(function(resp){
      console.log('response: ',resp.data.items);
      return resp.data.items;
    });
  };

  var getInstagram = function(query){
    return $http({
      //
    })
    .then(function(resp){
      return resp;
    }, function(err){
      if(err) return err;
    });
  };

  return({
    getYoutube: getYoutube,
    getInstagram: getInstagram,
  });
})

.controller('ResultController', ['Http', function ($rootScope, $scope, $window, $location, Http) {
    //Http.getResults를 사용해서 결과 요청 > $rootScope 변수에 담기 (array 형태?)
    $rootScope.results = [{breed: '코카 스파니엘'}, {breed: '골든 리트리버'}, {breed: '시베리안 허스키'}, {breed: '보더 콜리'}, {breed: '진돗개'}];

    angular.forEach($rootScope.results, function(dog){
      dog.relatedVideos = Http.getYoutube(dog.breed);
    });


}]);
