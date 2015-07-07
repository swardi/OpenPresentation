'use strict';
angular.module('User').factory('UserService',
    ['$cookieStore', '$rootScope', '$location', 'settings', 'DataService', '$q',  'LocalStorageService',
    function ( $cookieStore, $rootScope,  $location, settings, DataService, $q, LocalStorageService) {
       var service = {};
        service.$q = $q;
        service.currentUser = null;

        service.doLogin = function ( ) { 
            var daffered = service.$q.defer(); 
            DataService.InvokeService("POST", "api/user/login", {'username':service.getCredentials().username, 'password':service.getCredentials().password} , function (response) {
                    daffered.resolve(response);
            }, function (response) {
                     daffered.reject(response);
            });
            return daffered.promise;
 
        };
  
        service.getCurrentUser = function (){
            return service.currentUser;
        };
        
        service.setCurrentUser = function(user){
            service.currentUser = user;
        };

     

        service.setCredentials = function (username, password, isRememberMe) {
 
  
             var   currentUser =  {
                    username: username,
                    password:  CryptoJS.MD5(password).toString(), 
                    isAuthenticated : false,
                    userData : null,
                    isRemember : isRememberMe
                };
            service.setCurrentUser(currentUser.userData);
            LocalStorageService.put(settings.authenticationCookieName, currentUser);
        };
        
        service.setCredentialsFromCookie = function(){
             service.setCurrentUser ( LocalStorageService.get(settings.authenticationCookieName).userData )
        },


        service.getCredentials = function ( ) {
            
            return LocalStorageService.get(settings.authenticationCookieName);
        };

        service.setAuthenticated = function( userData){
            if(userData && LocalStorageService.get(settings.authenticationCookieName)  ){
                var currentUser = LocalStorageService.get(settings.authenticationCookieName);
                currentUser.isAuthenticated = true;
                currentUser.userData = userData; 
                service.setCurrentUser(userData);
                LocalStorageService.put(settings.authenticationCookieName, currentUser); 
            }

        };
        service.isAuthenticated = function () {  
            return LocalStorageService.get(settings.authenticationCookieName) && LocalStorageService.get(settings.authenticationCookieName).isAuthenticated;
        };


        service.logout = function () {
            this.clearCredentials();
        };

      
        service.clearCredentials = function () {
            service.setCurrentUser(null);
            LocalStorageService.remove(settings.authenticationCookieName); 
        };
  


        return service;
    }
 
]);
