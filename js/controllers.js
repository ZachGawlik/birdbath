var birdbathControllers = angular.module('birdbathControllers', ['ngAnimate']);

birdbathControllers.controller('TweetCtrl', function($http, twitterService) {
    var ctrl = this;
    this.tweets = [];
    this.deletedCount = 0;
    this.index = 0;
    this.user = '';
    this.isLoggedIn = false;
    this.isKeeping = false;
    this.isDeleting = false;

    twitterService.initialize();

    this.delete = function() {
        console.log('fakedelete');
        ctrl.isDeleting = true;
        this.deletedCount += 1;
        //this.nextTweet();
    };

    this.keep = function() {
        console.log('fakekeep');
        this.nextTweet();
    };

    this.keyPress = function(e) {
        if (e.keyCode === 68) { // D
            this.delete();
        } else if (e.keyCode === 75) { // K
            this.keep();
        }
    };

    this.nextTweet = function() {
        if (this.index + 1 >= this.tweets.length) {
            this.refreshTimeline(this.tweet.id);
            return;
        }
        this.index += 1;
        this.tweet = this.tweets[this.index];
        this.author = this.tweet.retweeted ? this.tweet.retweeted_status.user : this.tweet.user;
        this.user = this.tweets[0].user;
        this.isKeeping = false;
        this.isDeleting = false;
    };

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    this.refreshTimeline = function(maxId) {
        $http.get('example-response.json').success(function(data) {
        //twitterService.getLatestTweets(maxId).then(function(data) {
            ctrl.tweets = ctrl.tweets.concat(data);
            ctrl.nextTweet();
        },function(){
            ctrl.rateLimitError = true;
        });
    };

    this.refreshTimeline();

    //when the user clicks the connect twitter button, the popup authorization window opens
    this.connectButton = function() {
        //twitterService.connectTwitter().then(function() {
        //    if (twitterService.isReady()) {
        //        ctrl.refreshTimeline();
        //        ctrl.isLoggedIn = true;
        //    }
        //});
    };

    //if the user is a returning user display the tweets
    //if (twitterService.isReady()) {
    //    this.isLoggedIn = true;
    //    this.refreshTimeline();
    //}
});

