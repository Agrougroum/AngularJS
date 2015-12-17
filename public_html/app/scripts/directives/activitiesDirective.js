'use strict';


angular.module('publicHtmlApp')
  .directive('myFuckingDirective', function () {


    return {
    	restrict: 'A',
        templateUrl: 'afcHeader.html',
        replace: true,
        controller: 'controleurHeader'
    };



  });
