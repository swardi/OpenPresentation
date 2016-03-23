'use strict';
 
angular.module('Data').factory('DataService', ['settings',   '$http', 'LoadingMessageService',  function(settings,   $http, LoadingMessageService){

  
 
  return {
    
     InvokeService : function (method, url, data, successCallback, errorCallback) {
      
       $http({
          method : method,
          url:url,
          data:data
       }).success(function(response) {
      
        successCallback(response);
       }).error(function(error){
        errorCallback(error);
       })
    },

    ServiceFailedCallback : function (msg, response) {
      console.warn("Service Failure", resp);
    },

     JSON2Obj : function(data) {
      return typeof JSON !== "undefined" && JSON !== null ? JSON.parse(data) : void 0;
    },

    Obj2JSON : function(obj) {
      return typeof JSON !== "undefined" && JSON !== null ? JSON.stringify(obj) : void 0;
    }


  }
}]);


