
(function(){ //IFFY
 angular.module('myApp', ['ngRoute','resizable','draggable']).config(function ($routeProvider) {
    $routeProvider.
    when('/edit/:title/:uid', {
        templateUrl: 'script/modules/editor/edit.html',
        controller: 'editCtrl'
    }).
    when('/deck/:user/:pid', {
        templateUrl: 'script/modules/deck/deck.html',
        controller: 'deckCtrl'
    }).
    otherwise({
        redirectTo: '/edit/:title/:uid'
    });
});//:user/:pid

 }());