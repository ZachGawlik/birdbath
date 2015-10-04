angular.module('birdbathApp.services', []).factory('twitterService', function($q, $http) {

    var authorizationResult = false;

    return {
        initialize: function() {
            console.log('hehe init');
        },
        connectTwitter: function() {
            // TODO: hit api endpoint to do passport login
            var deferred = $q.defer();
            return deferred.promise;
        },
        deleteTweet: function(tweetId) {
            // TODO: look into restangular so I don't have to manually concat urls
            return $http.delete('api/tweets/' + tweetId);
        },
        // TODO: store these tweets within the service
        getLatestTweets: function(maxId) {
            var params = {};
            if (maxId) {
                params.max_id = maxId;
            }

            return $http({
                url: '/api/tweets',
                method: 'GET',
                params: params
            });
        }
    };

});
