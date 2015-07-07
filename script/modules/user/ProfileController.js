 'use strict';

angular.module('User').controller('ProfileController', [ "$scope", "PostService" , 'settings', '$timeout', 'UserService',
        function( $scope, PostService, settings,$timeout, UserService) {


  $scope.user=UserService.getCurrentUser();
 	$scope.masterUser = angular.copy(UserService.getCurrentUser());
 	$scope.user.emailNotAvailable=false;
 	$scope.user.emailAvailable=false;
 	$scope.user.usernameNotAvailable=false;
 	$scope.user.usernameAvailable=false;
  $scope.error=false;
  $scope.success = false;

    $scope.updateProfile = function(){
     
    	UserService.updateProfile($scope.user).then(function(response){
        $scope.success=true;
	    }, function(error){
	      $scope.error=true;
	    }); 


    }


     $scope.checkEmailAvailability = function(){
     	if($scope.user.email !== $scope.masterUser.email){
	    	UserService.checkEmailAvailability($scope.user.email).then(function(response){
	        	$scope.user.emailAvailable = true;
	        	$scope.user.emailNotAvailable = false;
		    }, function(error){
		       $scope.user.emailNotAvailable = true;
		       $scope.user.emailAvailable = false;
		    }); 
	    }else{
        $scope.user.emailNotAvailable=false;
        $scope.user.emailAvailable=false;
      }

    }



	 $scope.checkUsernameAvailability = function(){
      if($scope.user.username !== $scope.masterUser.username){
          UserService.checkUsernameAvailability($scope.user.username).then(function(response){
              $scope.user.usernameAvailable = true;
              $scope.user.usernameNotAvailable = false;
          }, function(error){
              $scope.user.usernameAvailable = false;
              $scope.user.usernameNotAvailable = true;
          }); 

      }else{
          $scope.user.usernameNotAvailable=false;
          $scope.user.usernameAvailable=false;
      }
    }


}]);
