

(function(){

var app = angular.module('myApp').factory('saveData',['$http',function($http){
var service = {};
 


 service.saveSlide = function(title,userid,elements){
//alert('ok');
return $http.post("../api/user/saveSlide",{'title':title,'userid':userid,'elements':elements}).then(function(response){
	return response.data;
				});

 };

 service.updateSlide = function(pid,elements){
return $http.post("../api/user/updateSlide",{'pid':pid,'elements':elements}).then(function(response){
	return response.data;
				});
 }




 return service;

}]);




}());