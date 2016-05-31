# PuppyFinder

## Synopsis

반려견을 처음으로 입양하려는 사람들을 위한 견종 추천 서비스

Puppy Matching Service for Newcomers 

## Motivation

처음 반려견을 입양하려는 사람들은 수없이 많은 견종 중에서 자신에게 적합한 종을 선택하기가 어렵습니다. Puppy Finder는 그러한 잘못된 선택으로 인한 유기견의 증가 등 사회적 문제를 경감하는데 도움이 될 수 있습니다. 저희는 처음 반려견을 입양할 때 간과하기 쉬운 평균적인 양육비용 등의 항목들에 대해 축적된 데이터베이스를 활용하여 최적의 제안을 하고자 합니다.

People often find it difficult when they try to adopt a puppy for the first time. This becomes a serious problem when a wrong decision leads to any types of animal abuse. We think choosing the right puppy can minimize accompanying social costs. PuppyFinder suggests the users what breeds are the best fit for them. We consider users' living conditions and expectations as owners including residence, expenditures and so on.

## Installation

Make sure to 
```
bower install
npm install
```
at the ROOT directory

* Bower deals with all installations related to Front-end
* NPM manages Back-end installations
* When bower install, make sure to select 3) (the latest version)

## How to Run
```
mongod
nodemon server/server.js
```
104.236.82.140:8888 : Redirects to intro.html (via express static)

104.236.82.140:8888/admin, /update, /upload, /stat : Admin Page to manage internal DB

## Basic Structure

* client/ 
  * app/ : Angular js and html files 
  * assets/ : Image files for styling
  * lib/ : javascript and css libraries such as Angular, Angular material, etc 
  * styles/ css files
  * index.html/ : Main view file for client
  
* server/
  * admin/ : Fuctionalities for admin use (e.g. upload, delete, update puppy data)
  * config/: Helper functions 
    * init.js: initialize puppies DB 
    * helpers.js: calculateTotalWeight, setWeight, sortArray
  * db/ :  puppy DB schema
  * server.js : Middleware setup, CRUD functionality using RESTful API
  
# PuppyFinder_FurtherGoals

## Backend

### 현재 추천 알고리즘
1. 각 질문의 옵션별 weight(일종의 점수)가 정해져 있다. 
2. 대부분의 질문은 0, 1점이고 비용 관련 질문만 점수가 10점대로 할당되어 있다.
	- 비용관련이 가장 비중이 높다고 생각했기 때문 
3. 사용자가 입력한 답들을 JSON으로 서버에 전송하면, 각 답에 따른 점수(weight)를 모두 합산하여 totalWeight을 낸 후, DB의 각 견종(breed)가 가지고 있는 자체 weight와 비교하여 가장 가까운 3 종을 response로 보내준다. 
4. 이 방식은 기본적으로 비용관련 질문에 대한 답에 따라 추천 견종이 결정되게 된다. 

### 개선점
1. 사용자가 입력한 답과 DB의 각 견종이 가진 답을 비교하여 둘이 일치할 때 점수(weight)를 주고, 이 점수를 합산하는 방식으로 변경하여 더 정확히 추천한다.
2. 사용자 질문 submit 후 서버에서 응답하는 데 걸리는 시간이 늘어날 걸로 보이므로 survey와 result 사이에 로딩화면이 필요할 것으로 보인다(별도의 html일 필요는 없음, survey 페이지에서 서브밋 버튼 누르면 ng-show로 로딩 애니메이션이 보이게 처리하면 될 듯).
3. 실수로 같은 breed data를 입력해도 중복처리가 안되어 있다.
4. Intro Background Video 가 Static File 로 처리됨 (10메가)

### Advanced
1. [다음 백과사전], 네이버 백과사전 등을 참고해 Result 페이지에서 더 많은 정보를 보여줄 수 있도록 DB의 견종별 정보를 더 세분화하여 입력한다. 특히 견종의 영문명을 추가하면 이미지 검색 API, Youtube API 등에 요청할 때 영문으로 해서 더 풍부한 검색 결과를 받아올 수 있을 것이다.
2. Admin 페이지에서 가져오고자 하는 대표 이미지 URL을 입력하면 서버에 fs로 저장해 준다. 
3. Admin 페이지의 갱신, 삭제 기능을 한 페이지로 통합하고 UI를 개선한다.
4. Admin 페이지에 접속 시 Login하도록 한다.
5. 통계결과를 보여줄 수 있는 Stat 페이지를 완성한다


## Frontend

### 개선점
1. Angular-Material이 좋긴 하나, 기능이 너무 많기 때문에 전체 앱보다 더 규모가 커서 초기 로딩속도를 느리게 한다는 문제가 있다.
2. Angular에는 비슷한 형식의 더 간단한 모듈들이 많기 때문에, 적절한 모듈을 검색해 보고 가능하다면 다른 모듈을 사용하여 Refactor하는 것이 속도 면에서 더 좋을 것 같다.
3. 하지만 이 경우, Angular-Material에서 적용한 Layout directive(absolutely easy and handy!!!!<3)를 사용할 수 없으므로 CSS로 Positioning은 다시 해야 할 것이다. 
4. 다른 대안은 Angular-Material을 살펴보고 필요없는 모듈을 걷어내는 것이다. 코드 리딩에 자신있다면 이 방법이 더 좋을 것 같다. 
5. 4번 방법을 사용할 경우, survey page에 스크롤 애니메이션을 적용하기 위해서는 md-virtual-repeat를 기본 앵귤러 내장인 ng-repeat으로 변경하고 질문 간 이동 함수를 구현해야 한다. 유려한 UI를 위해 스크롤 애니메이션 적용을 권장한다.
6. Survey 페이지에 바로 이전 질문으로 이동, 가장 위로 이동, 가장 아래로 이동하는 fixed 버튼을 추가한다. (Floating Action Button style)
7. 완성되지 않은 Styling(특히 Result Page)을 꼼꼼하게 살피고 마감한다.

### Advanced
1. Survey 페이지에서 현재 질문 진척 정도를 보여주는 progress bar를 추가한다. 귀여울수록 좋다.
2. Survey 페이지의 뒷 배경 이미지에 Parallax Scrolling을 적용한다.

## 전체 Advanced
1. Instagram permission을 받아내서 다음 이미지 서치를 Instagram으로 변경한다. 안 되면 영문 견종명으로 구글 이미지 검색으로 변경한다. 아니면 DB에 왕창 선별된 이미지들만 저장해서 result에서 갤러리로 보여준다. 
2. 현재 intro와 survey 페이지 사이에 user data(성별, 지역 등 통계에 필요한 기본 정보)를 입력받는 페이지를 추가하고, intro 페이지에서 뉴스레터 신청 팝업 링크를 만들어 신청한 사람에게 정기적으로 user와 result 통계를 제공해 준다. user data 페이지에서 정보제공에 동의하는 절차가 꼭 필요하다.


## Tests
TBD

## Contributors

Contributors may send PULL REQUESTS to this repo.

## License

TBD
