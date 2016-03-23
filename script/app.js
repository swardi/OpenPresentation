angular.module('Authentication', []);
angular.module('Data', []);
angular.module('User', []);
angular.module('Home', []);
angular.module('Dashboard', []);


var OpenPresentationApp = angular.module("OpenPresentationApp", [ "Data",
    "Authentication",
    "User",
    "Home",
    "Dashboard",
    "ui.router", 
    "ui.bootstrap", 
    "ngCookies",  
    "ngSanitize"
]); 

OpenPresentationApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        
     
        pageSize: 10,
        firstPage:0, 
        authenticationCookieName:'op_auth_cookie',
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);




/* Setup Rounting For All Pages */
OpenPresentationApp.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    

    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://prod.api.pinandtucker.com']);

    $urlRouterProvider.otherwise("/dashboard");  
    
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "script/modules/dashboard/views/dashboard.html",            
           // params: {},
            controller: "DashboardController"
     
        })

      

         .state("login", {
            url: "/login",
            templateUrl: "script/modules/user/views/index.html", 
            data: {pageTitle:  'Login'},
            controller: "LoginController"
        

        })
       
         .state("profile", {
            url: "/profile",
            templateUrl: "script/modules/user/views/profile.html",
            data: {pageTitle: 'Profile'},
            controller: "ProfileController"
        })
        
 

}]);

/* Init global settings and run the app */
OpenPresentationApp.run(["$rootScope", "settings", "$state",  "$location",  "settings","UserService", "LoadingMessageService", 
            function($rootScope, settings, $state,  $location,  settings, UserService, LoadingMessageService) {
    $rootScope.$state = $state; // state to be accessed from view

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

             if ( UserService.isAuthenticated() && !UserService.getCurrentUser()) { 
                event.preventDefault(); 
                UserService.doLogin().then(function(){
                    $rootScope.$emit('userLoggedIn', {});  
                    if($location.path() === '') $location.path ("/dashboard" );
                    $state.go( $location.path().substring(1), null, { reload: true });
                },function(){
                    $rootScope.$emit('userLoggedOut', {});
                    UserService.clearCredentials();
                });

            }
            

            if ($location.path() !== '/login' && !UserService.isAuthenticated()) {
                $location.path('/login');
            }

            if ($location.path() === '/login' && UserService.getCurrentUser()) {
                $location.path('/posts');
            }
            
            LoadingMessageService.loaded();
        }); 


}]);
