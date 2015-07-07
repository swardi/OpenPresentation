 'use strict';

angular.module('Authentication').controller('LoginController', ["$rootScope", "$scope", "$location", "UserService",
        function($rootScope, $scope,  $location, UserService) {

 
    $scope.page.showForgotForm = false;
    $scope.page.showLogin = true;
     $scope.page.showEmailField = true;
     $scope.error=false;
     $scope.password='';
     $scope.username='';

   $scope.login = function () {
    if(angular.equals($scope.username,  '')  || $scope.password === null || angular.equals($scope.password, '') ) {
        return;
    }
        UserService.setCredentials($scope.username, $scope.password, $scope.rememberMe); 
        UserService.doLogin().then( function(response) {
            if(response.user) { 
                $scope.error=false;
                UserService.setAuthenticated(response.user); 
                $rootScope.$emit('userLoggedIn', {});
            } else {
               UserService.setAuthenticated(false);
            } 
        }, function (res) {
            $scope.error=true;
            UserService.setAuthenticated(false);
        } );
    };

    $scope.showResetPasswordForm = function () {
        $scope.page.showForgotForm = true;
    }
    $scope.submitResetPassword = function(){
       UserService.resetPassword($scope.email).then(function(response) {
            $scope.page.showEmailField = false;
            $scope.page.emailNotFoundMsg=false; 
        }, function(error){
            $scope.page.emailNotFoundMsg = true;
        })
    }
}]);