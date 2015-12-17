var getDatesNoDuplicates = function(activities){
    //get the todos' dates
    var todosDatesForKeys = [];
    var todosDates = [];
    var j;
    angular.forEach(activities, 
      //loop on tasks
      function(value, key){
        angular.forEach(value.todos, 
          //loop on todos
          function(value2, key2){
            // stock the values as keys to avoid duplicates
            todosDatesForKeys[value2.date] = 0;
          }
        )
      }
    )
    // create the final table
    for (j in todosDatesForKeys) {
      todosDates.push(j);
    };
    //sort the table

    var toDate = function(string){
      //the basic javascript function date.parse is for english format
      var dt = string.split(/\//);
      var dat = new Date(dt.slice(0,3).reverse().join('/'));
      return dat;      
    }

    var compareDates = function(a, b){
      if (toDate(a) < toDate(b))
         return -1;
      if (toDate(a) > toDate(b))
         return 1;
      // a doit être égal à b
      return 0;     
    }

    todosDates = todosDates.sort(compareDates);
    //ajout d'objets vides pour les premières colonnes de libellés
    todosDates.unshift({}, {});

    return todosDates;
}