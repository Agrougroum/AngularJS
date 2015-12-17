(function () {

    var getAnswersService = function ($http) {

        var getAnswers = function(){
            return $http.get('json/answers.json')
                    .success(function (data) {
                         data;
                    });
        };


        return{
            getAnswers: getAnswers
        };
    };

    var module = angular.module('publicHtmlApp');
    module.factory("getAnswersService", getAnswersService);
}());


