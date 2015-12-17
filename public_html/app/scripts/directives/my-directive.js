angular.module('publicHtmlApp')
  .directive('myDirective', function() {
    return {
    	restrict: 'EA',
    	templateUrl: 'scripts/directives/myDirective.html',
    	controllerAs: 'controller',
    	require: 'myDirective',
    	transclude: true,
    	controller: function($scope, $rootScope, $compile){

    		var self = this;

    		self.rows = [];
    		self.columns = [];

        //TEMP
        $scope.main = {};


        $scope.$on('MyActivitiesReady', function(event, activities, dates) {
          $scope.activities = activities;
          $scope.tasksDates = dates;
        });


        $scope.valueFinaleFct = function(keyRow, keyColumn, valueRow, valueColumn){
          console.log('début valueFinaleFct')
          //si c'est la premiere ligne, on va chercher les dates dans la liste qui constitue les column : $scope.tasksDates = getDatesNoDuplicates(activities[0].tasks);
          if((keyRow==0)&&(keyColumn>1)){
            return $scope.tasksDates[keyColumn];
          }

          //si c'est la première colomn, on va chercher les libellés dans le tableau qui constitue les lignes (créé dans activité.js)
          if(keyColumn==0){
            return valueRow.lib;
          } 

          //Pour la deuxieme colonne : première ligne : Adding, si cat=main : input main, si cat=task : input task
          if((keyColumn==1)){

            if(keyRow==0){
              return "Adding";
            }

            //http://stackoverflow.com/questions/17405790/adding-ngmodel-to-input-with-a-directive

            if(valueRow.cat == "main"){
              var myDivId = 'cell' + keyRow + keyColumn;
/*              $('#' + myDivId).html($compile("<input type='text' placeholder='New Task for " + valueRow.lib + "' ng-model='main.chpsMain0'>")($scope));*/
              $('#' + myDivId).html("<input type='text' placeholder='New Task for " + valueRow.lib + "' ng-model='main.chpsMain0'>");



/*valueRow.lib +"' ng-model='chpsMain" + valueRow.valueMain + "'>");*/

/*valueRow.lib +"' id='myDamnInput'>");*/
/*              $('#myDamnInput').attr('ng-model', 'main.chpsMain0');*/


/*mainInputElement = document.getElementById(myDivId);
console.log('done', mainInputElement);

var a_input = angular.element($compile("<input type='text' placeholder='New Task for " + valueRow.lib + "' ng-model='main.chpsMain0'>")($scope))
console.log('inputcompiled', a_input);*/
/*mainInputElement.append(a_input);*/

/*              return "input main";*/
            }

            if(valueRow.cat == "task"){
              return "input task";
              /*$('#cell' + keyRow + keyColumn).html("<input type='text' placeholder='New Task for {{mainActivity[0].name}}' ng-model='chpsMain0'>");*/
            }            

          }

          //si c'est un main pas de value
          if((keyColumn>1) && (valueRow.cat == "main")){
            return "";
          }

          //Sinon on explore le tableau qui constitue les lignes pour retrouver les todos qui ont la date égale au libellé de la colonne (tasksDates[keyColumn])
          if((keyColumn>1) && (valueRow.cat == "task")){
            var todos = $scope.activities[valueRow.main].tasks[valueRow.task].todos
            for (var i = 0; i < todos.length; i++) {
              if(todos[i].date == $scope.tasksDates[keyColumn]){
                return todos[i].todo;
              }
            };
            //si rien trouvé dans la boucle for mais que la catégorie est bien task alors return ""
            return "";
          }

          return "error : cell not processed";

        }

        $scope.addTask = function(taskDirective){
          console.log('im emitting', taskDirective);

var inputs = $( "form input:text" );
console.log(inputs);




          $rootScope.$broadcast('AddingTask', taskDirective);
        }

        console.log('scope directive', $scope);


        $scope.main.chpsMain0='test';



    	},

    	scope:{
    		data:'=',
    	},

    	link: 
      {
        post: 
        function($scope, $element, $attrs, selfController, $compile) {
    		selfController.rows = $scope.data;

/*        console.log('$element', $element);
        console.log('$attrs', $attrs); */       

/*
            var wrappedElement = angular.element(
                '<input type="texr" ng-model="test">');
            $element.replaceWith(wrappedElement);
            $compile(wrappedElement)(scope);*/

    	 }
      }
    };
  })

  .directive('myDirectiveColumn', function() {
    return {
    	restrict:'EA',
   		require: '^myDirective',
      link: function($scope, $element, $attrs, parentController) {
        parentController.columns.push({"myDateColumn":$scope.value});
/*        console.log("scope enfant", $scope);*/
  		}
    };
  })
  ;
