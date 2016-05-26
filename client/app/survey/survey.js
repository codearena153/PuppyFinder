var questions = [];

var question_list = {
    1: {
        index : "slide1",
        subject : "질문01 | 생활환경",
        title: "반려견이 생활할 수 있는 야외 공간이 있나요?",
        content: "평소엔 너무나 사랑스러운 반려견도 제대로 활동할 수 있는 환경을 만들어주지 못한다면 최고의 말썽꾸러기가 되기도 합니다. 반려견을 맞이하기 전에 생활하기에 알맞은 환경을가지고 있는지 고려해 주세요",
        name: "inside",
        value_01: "true",
        value_02: "false",
        option1: "네, 마당이나 뒤뜰에 공간을 마련할 수 있어요.",
        option2: "아니오, 아늑한 실내에서 키울 거예요.",
        option3: ""
    },

    2: {
        index : "slide2",
        subject : "질문02 | 생활환경",
        title: "가족들과 함께 살고 있나요?",
        content: "반려견을 혼자 돌보게 되면 함께 보내는 시간에 따라 반려견이 외로워할 수 있기 때문에 가급적이면 2마리를 함께 키우는 것이 좋습니다. 독신이시라면 반려견에 충분한 애정을 주실 수 있는지, 가족분들과 함께 살고 계신다면 다른 가족 분들이 반려견을 함께 돌봐주실 준비가 되어 있는지 생각해 주세요.",
        name: "single",
        value_01: "false",
        value_02: "true",
        option1: "네, 가족들과 함께 살고 있어요",
        option2: "아니요, 혼자 살고 있지만 충분한 애정과 관심을 줄 수 있어요!",
        option3: ""
    },

    3: {
        index : "slide3",
        subject : "질문03 | 생활환경",
        title: "운동이나 야외활동, 산책 등을 즐기시는 편인가요?",
        content: "조깅 등 밖에서 활발하게 활동하는 걸 좋아하신다면 함께 뛰어다닐 수 있는 운동량이 많은 반려견을 만나셔야겠네요! 조용한 실내 활동을 더 좋아하신다면 차분한 반려견을 추천해 드릴게요.",
        name: "active",
        value_01: "true",
        value_02: "false",
        option1: "네, 밖에 나가는 걸 좋아하고, 반려견과 함께 운동하고 싶어요",
        option2: "아니오, 집에서 조용히 쉬는 걸 좋아해요. 한다면 가끔 산책 정도?",
        option3: ""
    },

    4: {
        index : "slide4",
        subject : "질문04 | 생활환경",
        title: "집을 자주 비우시는 편인가요?",
        content: "불가피하게 집을 자주 비우신다면 텅 빈 집을 지킬 수 있는 용감한 친구들이 좋겠죠? 그래도 역시 2마리를 함께 키우시는 게 가장 좋다는 점, 잊지 말아 주세요!",
        name: "absent",
        value_01: "true",
        value_02: "false",
        option1: "네, 제가 없는 동안 반려견이 집을 잘 지켜줬으면 좋겠어요.",
        option2: "아니오, 집에서 반려견과 많은 시간을 함께 보낼 거예요.",
        option3: ""
    },

    5: {
        index : "slide5",
        subject : "질문05 | 건강",
        title: "기관지가 약하거나, 알러지가 있으신가요?",
        content: "혹은 가족 구성원 중에 그런 분이 있으신가요? 모든 개는 침과 각질에 단백질이 있고, 털이 빠져 어떤 사람에게는 알레르기 반응을 일으킬 수 있습니다. 하지만 어떤 개들은 털이 적게 빠지기도 하죠. 그 외에, 집 안에서 중요한 작업을 하시거나, 옷을 많이 아끼시는 분들도 털이 적게 날리는 종을 만나셔야 할 거예요!",
        name: "allergic",
        value_01: "true",
        value_02: "false",
        option1: "네, 털이 적게 날리면 좋겠어요.",
        option2: "아니오, 제 기관지는 아주 튼튼해요. 청소는 자주 하면 되죠, 뭐. ",
        option3: ""
    },

    6: {
        index : "slide6",
        subject : "질문06 | 성격",
        title: "활발하고 사교적인 성격? \n조용하고 차분한 성격?",
        content: "아이나 노인이 함께 반려견을 키우실 거라면 사교적인 성격의 친구가 어울려요. 혹시 불면증이 있거나, 심리적인 안정이 필요하신 분들은 묵묵히 곁에 있어주는 친구를 소개해 드릴게요. 어떤 성격의 반려견을 만나고 싶으세요?",
        name: "friendly",
        value_01: "true",
        value_02: "false",
        value_03: "default",
        option1: "활발하고 사교적인 성격의 반려견이 좋아요!",
        option2: "조용하고 차분한 성격의 반려견이 좋겠어요.",
        option3: "상관없어"
    },

    7: {
        index : "slide7",
        subject : "질문07 | 입양",
        title: "입양 초기에 필요한 비용을 얼마로 예상하고 계신가요?",
        content: "반려견을 입양하는 데에는 생각보다 많은 초기 비용이 필요합니다. 직접적인 입양 비용 뿐만 아니라 초기에 반려견의 건강을 위해 받아야 하는 예방 접종비, 그리고 생활에 필요한 환경을 갖추기 위해 구입해야 하는 물품들의 비용까지 고려해야 합니다. 최대 얼마 정도의 입양 비용을 예상하고 계신가요?",
        name: "initialCost",
        value_01: 10,
        value_02: 20,
        value_03: 30,
        value_04: 40,
        value_05: 50,
        value_06: 100,
        value_07: 150,
        option1: 10,
        option2: 20,
        option3: 30,
        option4: 40,
        option5: 50,
        option6: 100,
        option7: 150
    },

    8: {
        index : "slide8",
        subject : "질문08 | 생활환경",
        title: "한 달에 얼마 정도의 양육비용을 예상하고 계신가요?",
        content: "반려견을 키우는 일을 생각보다 꾸준하게, 예상 외의 지출을 필요로 합니다. 멋있어 보여서 대형견을 입양했다가 식비를 감당하지 못하고 파양하는 경우도 많답니다. s한 달에 평균적으로 지출하실 수 있는 양육비용을 알려 주세요.",
        name: "maintenance",
        value_01: 5,
        value_02: 10,
        value_03: 15,
        value_04: 20,
        value_05: 25,
        value_06: 30,
        option1: 5,
        option2: 10,
        option3: 15,
        option4: 20,
        option5: 25,
        option6: 30,
    }

};

for (var question in question_list) {
    questions.push(question_list[question]);
}

angular.module('puppyfinder.survey', [])

.controller('SurveyController', function ($scope, $window, $location, $http) {
    $scope.questions = questions;

    var survey = {
        allergic: "true",
        friendly: "false"
    };

    $scope.sendQuery = function() {
        return $http.post('/search', survey)
        .success(function(res) {

        })
    };
});