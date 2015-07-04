var birdbathControllers = angular.module('birdbathControllers', []);

birdbathControllers.controller('TweetCtrl', function($http) {
    var ctrl = this;
    this.tweets = [];
    this.deletedCount = 0;
    this.index = 0;
    this.user = '';

    // Initial first load
    $http.get('example.json').success(function(data) {
        ctrl.tweets = data;
        ctrl.user = ctrl.tweets[0].user;
        ctrl.nextTweet();
    });

    this.delete = function() {
        console.log('fakedelete');
        this.deletedCount += 1;
        this.nextTweet();
    };

    this.keep = function() {
        console.log('lolkeep');
        this.nextTweet();
    };

    this.nextTweet = function() {
        this.index += 1;
        if (this.index >= this.tweets.length)
            return;

        this.tweet = this.tweets[this.index];
        this.author = this.tweet.retweeted ? this.tweet.retweeted_status.user : this.tweet.user;
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
    };
});
