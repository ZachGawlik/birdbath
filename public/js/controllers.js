var birdbathControllers = angular.module('birdbathControllers', ['ngAnimate']);

birdbathControllers.controller('TweetCtrl', function($http, $animate, twitterService) {
    var vm = this;

    vm.delete = function() {
        vm.isDeleting = true;
        vm.deletedCount += 1;
        //vm.nextTweet();
        // actually deletes a tweet
        //twitterService.deleteTweet(vm.tweet.id_str).then(function(data) {
        //    vm.nextTweet();
        //});
    };

    vm.keep = function() {
        //vm.isKeeping = true;
        var element = angular.element('.tweet')[0];
        $animate.addClass(element, 'isKeeping').then(function() {
            $animate.removeClass(element, 'isKeeping');
            vm.nextTweet();
        });
    };

    vm.keyPress = function(e) {
        if (e.keyCode === 68) { // D
            vm.delete();
        } else if (e.keyCode === 75) { // K
            vm.keep();
        }
    };

    vm.nextTweet = function() {
        if (vm.index + 1 >= vm.tweets.length) {
            vm.refreshTimeline(vm.tweet.id);
            return;
        }
        vm.index += 1;
        vm.tweet = vm.tweets[vm.index];
        vm.author = vm.tweet.retweeted ? vm.tweet.retweeted_status.user : vm.tweet.user;
        vm.user = vm.tweets[0].user;
        vm.isKeeping = false;
        vm.isDeleting = false;
    };

    // get the next 200 (max limit) tweets for the current user
    vm.refreshTimeline = function(maxId) {
        $http.get('example-response.json').then(function(data) {
        //twitterService.getLatestTweets(maxId).then(function(data) {
            console.log(data);
            vm.tweets = vm.tweets.concat(data.data);
            vm.nextTweet();
        });
    };

    (function init() {
        twitterService.initialize();
        vm.refreshTimeline();
        vm.tweets = [];
        vm.deletedCount = 0;
        vm.index = 0;
        vm.user = '';
        vm.isLoggedIn = true;
        vm.isKeeping = false;
        vm.isDeleting = false;
    }());

    //when the user clicks the connect twitter button, the popup authorization window opens
    vm.connectButton = function() {
        //twitterService.connectTwitter().then(function() {
        //    if (twitterService.isReady()) {
        //        vm.refreshTimeline();
        //        vm.isLoggedIn = true;
        //    }
        //});
    };
});

