angular.module('draggable',[]).directive('draggable', function () {

    return {
        restrict: 'A',
        link: function postLink(scope, elem, attrs) {
		
		   elem.draggable({containment:"slides"});
          
        }
    };
});
