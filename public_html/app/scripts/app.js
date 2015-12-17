'use strict';

/**
 * @ngdoc overview
 * @name publicHtmlApp
 * @description
 * # publicHtmlApp
 *
 * Main module of the application.
 */
angular
        .module('publicHtmlApp', [
            'ngAnimate',
            'ngRoute'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
//        controllerAs: 'main'
                    })
                    .when('/activite', {
                        templateUrl: 'views/activite.html',
                        controller: 'ActiviteCtrl'
                    })
                    .when('/play', {
                        templateUrl: 'views/playWithButtons.html',
                        controller: 'PlayCtrl'
                    })
                    
                    .when('/about', {
                        templateUrl: 'views/about.html',
                        controller: 'AboutCtrl'
//        controllerAs: 'about'
                    })
                    .when('/questions', {
                        templateUrl: 'views/questions.html',
                        controller: 'QuestionsCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });
