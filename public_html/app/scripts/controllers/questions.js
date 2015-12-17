'use strict';

/**
 * @ngdoc function
 * @name publicHtmlApp.controller:ActiviteCtrl
 * @description
 * # ActiviteCtrl
 * Controller of the publicHtmlApp
 */
 angular.module('publicHtmlApp')
 .controller('QuestionsCtrl', function ($scope, $http, getQuestionsService, getAnswersService, $location, $anchorScroll) {
  this.awesomeThings = [
  'HTML5 Boilerplate',
  'AngularJS',
  'Karma'
  ];
  $scope.mainActivity= [];
  $scope.correctAnswersCount = 0;

//Get questions
var onGetQuestionsComplete = function(response){
  $scope.mainActivity = response.data;
  console.log($scope.mainActivity);

  var theme = $scope.mainActivity;  
  var questions = theme.javascript.questions;
  //console.log(questions);

};

var onError = function(reason) {
  console.debug("error : " + reason);
};

getQuestionsService.getQuestions().then(onGetQuestionsComplete, onError);


//Get answers
var Answers = {};

var onGetAswersComplete = function(response){
  $scope.Answers = response.data;

};

getAnswersService.getAnswers().then(onGetAswersComplete, onError);

//post user results
$scope.objTabResults = {}

$scope.goToParentScope = function(questionInput, responseInput){

  //key:questionInput, value:responseInput
  var key = questionInput;
  $scope.objTabResults[key] = responseInput;
}

//get final results        
$scope.checkResults = function(themeName){

//results concerns the appropriate theme
var Results = $scope.objTabResults;
//answers for the concerned theme
var Answers = $scope.Answers[themeName];

var correctAnswersCount = 0;
var incorrectAnswersCount = 0;
var numKeyInTab;

angular.forEach(Results, function(value, key) {

  if(Results[key] == Answers[key]){
    //user has given the right answer
    correctAnswersCount +=1;

    //Recupération de l'indice dans le tableau pour affecter le statut et lancer la classe conditionnelle good dans le template
    numKeyInTab = key.substring(1, key.length)-1;
    $scope.mainActivity.javascript.questions[numKeyInTab].status = false;
    $scope.mainActivity.javascript.questions[numKeyInTab].rightAnswer = true;

    //in case of multiple submit
    $scope.mainActivity.javascript.questions[numKeyInTab].wrongAnswer = false;

  } else {
    //user has given the wrong answer
    incorrectAnswersCount +=1;

    //Recupération de l'indice dans le tableau pour affecter le statut et lancer la classe conditionnelle wrong dans le template
    numKeyInTab = key.substring(1, key.length)-1;
    $scope.mainActivity.javascript.questions[numKeyInTab].status = true;
    $scope.mainActivity.javascript.questions[numKeyInTab].wrongAnswer = Answers[key];

    //in case of multiple submit
    $scope.mainActivity.javascript.questions[numKeyInTab].rightAnswer = false;
  }

});

$scope.correctAnswersCount = correctAnswersCount;
$scope.incorrectAnswersCount = incorrectAnswersCount;

//scroll to the top of the tab
$location.hash(themeName);
$anchorScroll();
};


var myRessourceQuestions = $resource('/questions/:questionId', {questionId:'@id'});

$scope.myParticularTopic = myRessourceQuestions.get({questionId:1});
console.log("ressource", $scope.myParticularTopic);

});
