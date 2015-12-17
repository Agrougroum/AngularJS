(function () {

    var getQuestionsService = function ($http) {

        var getQuestions = function(){
            return $http.get('json/questions.json')
                    .success(function (data) {
                         data;
                    });
        };

        return{
            getQuestions: getQuestions
        };
    };

    var module = angular.module('publicHtmlApp');
    module.factory("getQuestionsService", getQuestionsService);
}());


