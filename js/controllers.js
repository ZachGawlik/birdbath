var birdbathControllers = angular.module('birdbathControllers', []);

birdbathControllers.controller('TweetCtrl', function($http) {
    var ctrl = this;
    this.tweets = [];
    this.deleted = [];
    this.current = 0;

    $http.get('example.json').success(function(data) {
        ctrl.tweets = data;
    });

    this.delete = function() {
        console.log('fakedelete');
    };

    this.keep = function() {
        console.log('lolkeep');
    };

    this.keyPress = function(e) {
        if (e.keyCode === 68) { // D
            this.delete();
        } else if (e.keyCode === 75) { // K
            this.keep();
        }
    };

    this.softDeleteTweet = function(tweet) {
        tweet.isActive = false;
        this.deleted.push(tweet);
    }
});
