/*globals angular*/

var app = angular.module('app', [
    'ui.router',
    'ngResource'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    'use strict';

    // Set up the states
    $stateProvider
        .state('tags', {
            url: "/search/:tag",
            templateUrl: "search.html",
            controller: 'SearchCtrl as ctrl'
        }).state('owner', {
            url: "/owner/:id",
            templateUrl: "search.html",
            controller: 'SearchCtrl as ctrl'
        });

    // For any unmatched url
    $urlRouterProvider.otherwise("/search/forest");

});

app.constant('FlickrApiKey', function () {
    'use strict';
    return '797665fcd10ec064fe83d5149acc2295';
});



//NOTE Be sure to precede every function exported and added to this module with /* @ngInject */
//This is an explicit hint to ng-annotate, and is required,
//because comprehending and traversing the browserify-ed commonJS modules is beyond the scope of ng-annotate
//If this is not done, AngularJs' dependency injection will fail on minified builds
//See https://docs.angularjs.org/tutorial/step_05#a-note-on-minification
app.factory('FlickrService', require('./services/flickr-service'));
app.controller('SearchCtrl', require('./controllers/search-ctrl'));
app.directive('myDataLoader', require('./directives/data-loader'));

