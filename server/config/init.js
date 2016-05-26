var mongoose = require('mongoose');
var db = 'mongodb://localhost/puppy';
var Puppy = require('../db/Puppy.model');
var addWeight = require('./helpers').addWeight;

module.exports = function(){

    // Connects mongo DB
    mongoose.connect(db);

    // Drop the table so that everyone starts from the same page in mongoDB
    Puppy.remove({}, function(err) {
        console.log('puppies collection removed :)');
    });

    // puppy 01
    var puppy = new Puppy();

    puppy.breed = "노르웨이언 엘크하운드";
    puppy.description = "이 고전적인 엘크하운드는 최초로 석기시대에 인류의 곁에 있었던 북방견과 매우 비슷한듯 하다. 노르웨이에서 발견된 그 시대의 개의 골격은 오늘날의 엘크하운드와 거의 같다. 스칸디나비아 전역에 엘크하운드 타입의 개들은 혈통표나 공식기구 없이 활용, 교배되어왔다. 이 개들은 훌륭한 일꾼이었으며 약간의 사소한 지역차이를 제외하고는 꽤 순수한 피를 지키며 교배되어왔다. 노르웨이안 검은 엘크하운드는 가장 작은종이며 회색의 노르웨이안 엘크하운드는 노르웨이의 국견으로 외국에서도 명성이 자자하다. 현대에 와서 이 견종들은 종종 짝을 지어 사냥을 하고 사냥감을 찾고, 이를 사냥꾼 쪽으로 몰거나 사격범위 안으로 몰아주어 열성 스포츠맨들을 돕는다. 이들은 센트하운드처럼 큰 거리를 두고 사냥감을 쫓는 추적견은 아니지만, 북구의 숲에서 사냥꾼을 돕는일을 한다";
    puppy.image = 'sample.png';
    puppy.isUserAllergic.allergic = "true";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "true";
    puppy.isUserSingle.single = "true";
    puppy.isPuppyFriendly.friendly = "false";
    puppy.isPuppyInside.inside = "true";
    puppy.initialCost.cost = "50";
    puppy.maintenance.cost = "10";
    puppy.total_weight = addWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 02
    puppy = new Puppy();

    puppy.breed = "오스트레일리안 테리어";
    puppy.description = "두 마리의 오스트레일리아 테리어 견종의 역사는 서로 밀접하게 연관되어 있다. 오스트레일리안 테리어와 실키 테리어는 둘 다 오스트레일리아인들이 다양한 영국의 테리어종을 이용해 19세기에 개량한 견종들이다. 기록을 살펴보면, 이 견종의 조상은 이주민들과 함께 오스트레일리아로 건너간 스코틀랜드와 북잉글랜드의 테리어종들에게서 시작되었다. 뻣뻣한 털과 짧은 다리를 가진 스코티(Scottie) 또는 케언(Cairn)와 함께 털이 많고 몸길이를 길게 하는 동시에 다리가 짧은 유전인자를 강화시킴으로써 변종되어 갔다. 그 이후에 나타난 변종들은 댄디(Dandie)의관모와 요키(Yorkie)의 바랜 듯한 푸른색 털 그리고 작은 몸 크기를 가지게 되었다";
    puppy.image = 'sample.png';
    puppy.isUserAllergic.allergic = "true";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "true";
    puppy.isUserSingle.single = "true";
    puppy.isPuppyFriendly.friendly = "false";
    puppy.isPuppyInside.inside = "true";
    puppy.initialCost.cost = "50";
    puppy.maintenance.cost = "10";
    puppy.total_weight = addWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err)  res.send("error saving new puppy");
      else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 03

    // puppy 04

    // puppy 05

    // puppy 06

    // puppy 07

    // puppy 08


};