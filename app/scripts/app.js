(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Model({
            enabled: true,
            requireBase: false
        });
        
        $stateProvider
            .state('landing', {
            url: '/',
            templateUrl: '/bloc-jams-angular/app/templates/landing.html'
            })
        
            .state('album', {
                url: '/album',
                templateUrl: '/bloc-jams-angular/app/templates/album.html'
            })
        
            .state('collection', {
            url: '/collection',
            templateUrl:'/bloc-jams-angular/app/templates/collection.html'
            })
    }

angular
    .module('blocJams', ['ui.router'])
    .config(config);
    
})();