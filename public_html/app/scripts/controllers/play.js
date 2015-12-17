'use strict';

/**
 * @ngdoc function
 * @name publicHtmlApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the publicHtmlApp
 */
angular.module('publicHtmlApp')
  .controller('PlayCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.init = "true";
  });
