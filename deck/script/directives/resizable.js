angular.module('resizable',[]).directive('resizable', function () {

    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem, attrs) {
			elem.append("<span class='n-handle handle0'></span><span class='n-handle handle1'></span><span class='n-handle handle2'></span>");
            elem.resizable();
            elem.on('resize', function (evt, ui) {
				
				   var w = ui.size.width;
					var h = ui.size.height;
					w=Math.log(w*h);//font-size: 5.7vw;
				
			$('.ui-resizable-resizing').css("font-size", Math.round(h/w)*4);

              scope.$apply(function() {
                if (scope.callback) { 
                  scope.callback({$evt: evt, $ui: ui}); 
                }                
              })
            });
        }
    };
});
