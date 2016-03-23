

(function(){

var app = angular.module('myApp').factory('getData',['$http',function($http){

 var getSlide = function(pid){


    

return $http.post("../api/user/getSlide",{'pid':pid}).then(function(response){
   
return response.data;

                  });

 };




 return {getSlide: getSlide };

}]);




}());