var mongoose = require('mongoose');
var db = 'mongodb://localhost/puppy';
var Puppy = require('../db/Puppy.model');
var setWeight = require('./helpers').setWeight;


/* Drop collection and add insert new puppy documents into local DB */
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
    puppy.image = 'NE.png';
    puppy.isUserAllergic.allergic = "true";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "true";
    puppy.isUserSingle.single = "true";
    puppy.isPuppyFriendly.friendly = "false";
    puppy.isPuppyInside.inside = "true";
    puppy.initialCost.cost = "50";
    puppy.maintenance.cost = "10";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 02
    puppy = new Puppy();

    puppy.breed = "오스트레일리안 테리어";
    puppy.description = "두 마리의 오스트레일리아 테리어 견종의 역사는 서로 밀접하게 연관되어 있다. 오스트레일리안 테리어와 실키 테리어는 둘 다 오스트레일리아인들이 다양한 영국의 테리어종을 이용해 19세기에 개량한 견종들이다. 기록을 살펴보면, 이 견종의 조상은 이주민들과 함께 오스트레일리아로 건너간 스코틀랜드와 북잉글랜드의 테리어종들에게서 시작되었다. 뻣뻣한 털과 짧은 다리를 가진 스코티(Scottie) 또는 케언(Cairn)와 함께 털이 많고 몸길이를 길게 하는 동시에 다리가 짧은 유전인자를 강화시킴으로써 변종되어 갔다. 그 이후에 나타난 변종들은 댄디(Dandie)의관모와 요키(Yorkie)의 바랜 듯한 푸른색 털 그리고 작은 몸 크기를 가지게 되었다";
    puppy.image = 'AT.png';
    puppy.isUserAllergic.allergic = "fase";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "true";
    puppy.isUserSingle.single = "false";
    puppy.isPuppyFriendly.friendly = "false";
    puppy.isPuppyInside.inside = "true";
    puppy.initialCost.cost = "150";
    puppy.maintenance.cost = "20";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 03
    puppy = new Puppy();

    puppy.breed = "바셋하운드";
    puppy.description = "1500년대 후반에 개발되었으며 이름은 프랑스어로 '낮다' 라는 뜻의 'BAS'에서 유래되었다. 영국에는 1875년에 소개되었고, 1883년에 클럽이 설립됐다. 사냥에는 토끼 뿐만이 아니라 다른 동물(오소리,너구리,쥐 등)사냥에도 소질이 있지만 훈련 성능은 다소 떨어지며 관절 계통의 질병과 허리 디스크, 비만에 주의해야 한다. 상냥하고 애정이 많은 편이나 고집이 세고 귀찮은 것을 싫어해서 번견으로는 부적당하며 훈련시에는 상당한 끈기가 필요하다";
    puppy.image = 'BH.png';
    puppy.isUserAllergic.allergic = "false";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "true";
    puppy.isUserSingle.single = "false";
    puppy.isPuppyFriendly.friendly = "true";
    puppy.isPuppyInside.inside = "true";
    puppy.initialCost.cost = "30";
    puppy.maintenance.cost = "25";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 04
    puppy = new Puppy();

    puppy.breed = "비글";
    puppy.description = "비글의 기원은 잘 알려지지 않고 있으나 아주 오래전에 비글 비슷한 작은 사냥개가 영국의 웨일즈(Wales)에서 토끼사냥에 사용되었다. 비록 아르토이스(Artois)나 다른 종류의 하운드와 같은 타입의 개와 교배되어 현재의 견종을 만들어냈지만 본래는 아마도 켈트족이 기르던 하운드에서 나왔을 것으로 추정된다. 전 세계적으로 사냥을 즐기는 사람들은 개인적으로 혹은 집단으로 다람쥐, 토끼 등을 사냥하는데 개를 이용하였다. 비글은 이러한 사냥에 아주 적합한 견종으로 그들은 단호하고 날카로운 사냥꾼이며, 사냥을 하는 동안 메아리치는 거위의 울음소리와 흡사한 노래로 초보나 프로사냥꾼 모두에게 사냥감의 위치를 알려준다";
    puppy.image = 'BG.png';
    puppy.isUserAllergic.allergic = "true";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "true";
    puppy.isUserSingle.single = "false";
    puppy.isPuppyFriendly.friendly = "true";
    puppy.isPuppyInside.inside = "true";
    puppy.initialCost.cost = "20";
    puppy.maintenance.cost = "20";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 05
    puppy = new Puppy();

    puppy.breed = "비숑 프리제";
    puppy.description = "1300년경 스페인 남쪽의 카나리아 제도의 페네리페 섬 해변에서 발견되었으며 이태리인 여행객이 유럽으로 데리고 돌아갔다고 하지만 확실한 근거는 없으며 확실한 것은 그 후 1500년경 프랑스에 반입되어 귀족들 사이에서 유행 되었다고 한다. 그러나 프랑스 혁명이 지나고 수가 감소했다가 다시 유행하게 된 것은 1930년이 되어서이며 1934년에 프랑스의 FCI,1971년에 미국의 AKC, 1975년 캐나다의 CKC에서도 공인되었다. 곱슬거리는 털을 가졌다는 뜻의 '비숑프리제'라는 이름처럼 뛰어난 털을 가지고 있으며 매우 튼튼한 체질의 견종으로 마치 인형 같은 느낌을 주어 프랑스의 여성들 사이에서 인기 1위를 차지한다";
    puppy.image = 'BP.png';
    puppy.isUserAllergic.allergic = "true";
    puppy.isUserAbsent.absent = "true";
    puppy.isUserActive.active = "false";
    puppy.isUserSingle.single = "false";
    puppy.isPuppyFriendly.friendly = "true";
    puppy.isPuppyInside.inside = "false";
    puppy.initialCost.cost = "100";
    puppy.maintenance.cost = "15";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 06
    puppy = new Puppy();

    puppy.breed = "복서";
    puppy.description = "초기에는 투우나 투견을 목적으로 만들어졌으나 점차 경찰견,군용견으로 이용되었으며 1800년경 후반부터는 불독과 교배되어 가정견으로서 현재의 모습으로 유지되어 왔다. 원산지인 독일에서 많은 사랑을 받았으며 1900년경이 되어서는 영국과 미국에서 수입을 시작하였고, 서구 사회에서 명성을 얻게 되면서 특히 미국에서 유행되기도 하였다. 언더숏의 형태로 뒷다리가 길어 등높이와 구분이 되지 않을 정도이므로 일어서면 뒷다리를 세워져 공격자세가 나오기 때문에 복서라는 이름이 붙게 되었다. 생김새와 비슷하게도 건장한 몸집이지만 날쌘 모습이므로 조금만 손질을 하게되면 균형미와 함께 기품있는 모습이 된다. 강아지 선택시 체격보다도 골격에 주시해야 한다.털은 단모종에 광택이 있고 특별히 흰색이 1/3이 넘지 않고 황갈색이 몸을 덮어야 고품질로 인정 받고 있다. 또한 이빨은 맞물릴 때 아랫니가 윗니보다 앞으로 나오는 것이 이상적이며 서구에서는 귀와 꼬리를 짧게 하는것이 전통이라고 한다";
    puppy.image = 'BX.png';
    puppy.isUserAllergic.allergic = "true";
    puppy.isUserAbsent.absent = "true";
    puppy.isUserActive.active = "false";
    puppy.isUserSingle.single = "false";
    puppy.isPuppyFriendly.friendly = "true";
    puppy.isPuppyInside.inside = "false";
    puppy.initialCost.cost = "30";
    puppy.maintenance.cost = "10";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });

    // puppy 07
    puppy = new Puppy();

    puppy.breed = "치와와";
    puppy.description = "중국인들은 식물이나 물고기, 짐승등을 축소하는 기술을 오랫동안 실행해 왔다. 스페인 여행객들이 중국여행을 마치고 돌아오는 길에 멕시코를 들렸는데 그때 그들이 데리고 있던 개 몇마리를 그곳에 두고 왔다고 한다. 이 개들이 토착종인 털없는 개들과 교배되어 현재, 세계에서 가장 작은 개인 치와와가 탄생한 것이다.몇몇 개 전문가들은 이 견종이 단순히 토착파리아(Pariah)종의 축소판이라고 말하기도 한다. 포르투칼산의 크기가 작은 포덴고(Podengo)종과의 유사성은 매우 특이한 점이다. 이 작은 개는 멕시코의 치와와 주(州)의 이름에서 그 명칭이 유래된 것으로 보이며 이들의 존재에 대한 전설이나 이야기들도 다양하다. 그러나 이러한 설을 뒷받침할 만한 어떠한 근거도 발견된 바가 없다. 사실, 최근의 조사는 그 반대의 증거를 보여 주었다. 조사원들은 테치치(Techichi)라고 불리우는 현재의 프레리독과 유사한 개가 존재했었다고 보고 하였다.";
    puppy.image = 'CW.png';
    puppy.isUserAllergic.allergic = "false";
    puppy.isUserAbsent.absent = "false";
    puppy.isUserActive.active = "false";
    puppy.isUserSingle.single = "true";
    puppy.isPuppyFriendly.friendly = "true";
    puppy.isPuppyInside.inside = "false";
    puppy.initialCost.cost = "150";
    puppy.maintenance.cost = "15";
    puppy.total_weight = setWeight(puppy);

    puppy.save(function(err, puppy) {
      if (err) {
        console.error("error saving new puppy");
      } else {
        console.log("puppy created: ", puppy);
      }
    });
};