OpenPresentationApp.factory('LoadingMessageService', function($rootScope) {
    return {
        loading : function(message) {
             angular.element("#loadingMessage").text(message);
             angular.element("#loadingMessage").addClass("show").removeClass("hide");
        },
        loaded : function() {
             angular.element("#loadingMessage").text("");
             angular.element("#loadingMessage").addClass("hide").removeClass("show");
        }
    }
})