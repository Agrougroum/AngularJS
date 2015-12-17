'use strict';

/**
 * @ngdoc function
 * @name publicHtmlApp.controller:ActiviteCtrl
 * @description
 * # ActiviteCtrl
 * Controller of the publicHtmlApp
 */
 angular.module('publicHtmlApp')
 .controller('ActiviteCtrl', function ($scope, $http, getJsonService, $timeout, $rootScope) {
  this.awesomeThings = [
  'HTML5 Boilerplate',
  'AngularJS',
  'Karma'
  ];

$scope.mainActivity= [];

var onGetActivitiesComplete = function(response){
    //get the global object activity
    $scope.mainActivity = response.data;
    $scope.taskDates = getDatesNoDuplicates($scope.mainActivity[0].tasks);

    $rootScope.$broadcast('MyActivitiesReady', $scope.mainActivity, $scope.taskDates);    
};

var onError = function(reason) {
  console.debug("error : " + reason);
};

$scope.addTask = function(task){
  console.log('addtask', task)
  $http.post("server/insert.php",{'task': task})
  .then(onAddTaskComplete, onError);   

};

var onAddTaskComplete = function(){
  console.log("inserted Successfully");
  getJsonService.getJson('activite').then(onGetActivitiesComplete, onError);

  //update page infos
  $scope.chpsMain0 = null;    
};

//ACTIONS ON LOAD
getJsonService.getJson('activite').then(onGetActivitiesComplete, onError);

$scope.$on('MyActivitiesReady', function(event, activities) {
  $scope.$apply;
});

$scope.$on('AddingTask', function(event, task) {
console.log('imback', task);
  $scope.addTask(task);
});

/*var flattenMyJsonToFitMyColumn = function(jsonTab){
  var flatList = [{"lib": "activité", "cat":"head"}];

  for (var i = 0; i < jsonTab.length; i++) {
    flatList.push({"lib":jsonTab[i].name, "cat":"main", "valueMain":i});
    //if tasks
    for (var j = 0; j < jsonTab[j].tasks.length; i++) {
      flatList.push({"lib":jsonTab[i].tasks[j].name, "cat":"task", "main":i, "task":j});
    };
  };
}
*/
//nb of rows
$scope.list = [{"lib": "activité", "cat":"head"}, {"lib":"taf", "cat":"main", "valueMain":0}, {"lib":"JS", "cat":"task", "main":0, "task":0}, {"lib":"angularJS", "cat":"task", "main":0,"task":1}];
        console.log('scope main', $scope);
});

