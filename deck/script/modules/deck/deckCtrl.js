
(function(){

angular.module('myApp').controller('deckCtrl', function ($scope,$routeParams,getData) {

//$scope.name= $routeParams.user;
var pid = $routeParams.pid;
//$scope.page.sidebar=true;
var divSlide = angular.element( document.querySelector( '.slides' ) );
//var divSlide = angular.element('.slides');

var slide =getData.getSlide(pid).then(function(data){


Data = data.slide.presentation;

divSlide.append(Data);
Reveal.initialize({ controls:true, transition:'slide' });

});




 //Reveal.initialize({ controls:true, transition:'slide' }); 


});




}());