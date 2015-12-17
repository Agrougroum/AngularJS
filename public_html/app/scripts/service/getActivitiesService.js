(function () {

    var getActivitesService = function ($http) {

        var getActivities = function(){
            return $http.get('json/activite.json')
                    .success(function (data) {
                         data;
                    });
        };


        return{
            getActivities: getActivities
        };
    };

    var module = angular.module('publicHtmlApp');
    module.factory("getActivitesService", getActivitesService);
}());


