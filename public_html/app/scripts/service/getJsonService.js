(function () {

    var getJsonService = function ($http) {

        var getJson= function(jsonFile){
            return $http.get('json/'+ jsonFile +'.json')
                    .success(function (data) {
                         data;
                    });
        };


        return{

            getJson: getJson
            
        };
    };

    var module = angular.module('publicHtmlApp');
    module.factory("getJsonService", getJsonService);
}());


