'use strict';
angular.module('Data').factory('LocalStorageService',['$q','$timeout', function($q, $timeout){
	
	var storage = {};
		storage.get= function(name){
			var data=null;
			var obj=$.cookie(name);
			if(obj)
             	data=JSON.parse(obj);
             return data;
        },

        storage.getAllCookies= function(){
            return $.cookie();
        },

        storage.put= function(name, value){
        	var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() + 15);
            return $.cookie(name, JSON.stringify(value), { expires: expireDate});
        },

        storage.remove= function(name){
            return $.removeCookie(name);
        }				
	return storage;
}])