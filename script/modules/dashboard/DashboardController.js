'use strict';

OpenPresentationApp.controller('DashboardController', function($rootScope, $scope) {
  
    $scope.page.dashboard=true;

//var user=$rootScope.us;




  /* $scope.$on('$viewContentLoaded', function() {   
     
   });*/


    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
   // $rootScope.settings.layout.pageSidebarClosed = false;
});