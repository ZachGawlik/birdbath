var angular = require('angular');
var ngAnimate = require('angular-animate');
var birdbathControllers = require('./js/controllers');
var OAuth = require('oauth-js');

var app = angular.module('birdbathApp', [
    'ngAnimate',
    'birdbathApp.services',
    'birdbathControllers'
]);
