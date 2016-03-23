(function(){

var app = angular.module('myApp',[]).factory('getData',['$http',function($http){

 var getSlide = function(pid){


    

return $http.post("../api/user/getSlide",{'pid':pid}).then(function(response){
   
return response.data;

                  });

 };

 var getUrlVars = function()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

 return {getSlide: getSlide,
         getPid  : getUrlVars };

}]).controller('main',['getData', function(getData) { //  MAIN_Controller
   


    



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
console.log("success");
var pre_id = null;
divSlide = angular.element('.slides');
//me = getUrlVars()["name"];
pre_id = getData.getPid()["pid"];

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


}]);

// Read a page's GET URL variables and return them as an associative array.


}());