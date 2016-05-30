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

* When bower install, make sure to select 3) (the latest version)

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
  
## Tests
TBD

## Contributors

Contributors may send PULL REQUESTS to this repo.

## License

TBD
