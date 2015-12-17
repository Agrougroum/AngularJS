(function () {

    var getCalendarService = function ($http) {

        var getCalendar = function(){
            return $http.get('json/dates.json')
                    .success(function (data) {
                         data;
                    });
        };


        return{
            getCalendar: getCalendar
        };
    };

    var module = angular.module('publicHtmlApp');
    module.factory("getCalendarService", getCalendarService);
}());


