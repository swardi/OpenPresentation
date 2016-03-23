

(function(){ //IFFY

angular.module('myApp').controller('sidebarCtrl', function ($scope,$compile) { 

$scope.Text = function(){



$("body > div.reveal.slide.center > div.slides.ng-scope > section.ng-scope.present").append($compile("<div  draggable contenteditable='true'> <h1>Your Title Here</h1> </div>")($scope));

};// Text() end

	 });// controller end

}());


