(function(){

var app = angular.module('myApp').controller('mainCtrl',['getData','$routeParams', function(getData,$routeParams) { //  MAIN_Controller
   


    

$scope.h = 'OSAMA_SD';

// Read a page's GET URL variables and return them as an associative array.


/*
var catureImage = function(){

html2canvas(document.body).then(function(canvas) {
    convertCanvasToImage(canvas);
});

    function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

} */
/*
var pre_id = $routeParams.pid;
alert('Good');
if(pre_id){
slide=getData.getSlide(pre_id).then(function(data){


Data = data.slide.presentation;

divSlide.append(Data);
Reveal.initialize({ controls:true, transition:'slide' });

});

}else{
 
 me = getData.getPid()["name"];
 
$scope.newSlide = function(){
if(!newPage){
    newPage = getIndex();
}
}

}
*/

}]);

// Read a page's GET URL variables and return them as an associative array.


}());