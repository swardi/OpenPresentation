OpenPresentationApp.controller('AppController', ['$scope', '$rootScope', '$location',  'UserService',
                                        function($scope, $rootScope, $location, UserService) {
     $scope.page =  {} ;
     $scope.page.showLogin = !UserService.isAuthenticated();
     $rootScope.loadingMessage = null;
     
    $rootScope.$on('userLoggedIn', function (event, data) {
        if($location.path() === '/login')
          $location.path('/dashboard');
    });

    $rootScope.$on('userLoggedOut', function (event, data) {
         $location.path('/login');
    });

    
}]);

OpenPresentationApp.controller('HeaderController', ['$scope', '$rootScope',  'UserService', 'settings', function($scope, $rootScope,  UserService, settings) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });

    $scope.user={};

    $rootScope.$on('userLoggedIn', function (event, data) {
      $scope.page.showLogin=false;
      $scope.user =   UserService.getCurrentUser(); 
      
    });



    $scope.logout = function(){
        UserService.logout();
        $rootScope.$emit('userLoggedOut', {});
    }


}]);

OpenPresentationApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

OpenPresentationApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);