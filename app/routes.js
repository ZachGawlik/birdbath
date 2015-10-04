// TODO: figure out how to use separate express.Router() instance
// TODO: app.use('api', router) to have all prefixed with /api/

var Twit = require('twit'); // TODO: figure out how to put into new file/module
var configAuth = require('../config/secrets'); // TODO: remove this use passport obj instead

module.exports = function(app, passport) {

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    app.get('/api/tweets', function(req, res) {
        var T = new Twit({
            consumer_key: configAuth.twitterAuth.consumerKey,
            consumer_secret: configAuth.twitterAuth.consumerSecret,
            //access_token: req.user.twitter.token,
            //access_token_secret: req.user.twitter.tokenSecret
            access_token: '410441130-xrraADR4q2kImUGL0SNJiqaOJzKDyhG6clBbzGAf',
            access_token_secret: 'fqACGZyHhivdzvK4gnTzAY0UiyIIz9XAWEXT85jo7MMim'
        });

        var params = {
            count: 200
        };

        // Set max_id if passed in via query string param
        // Used to get next "page" of tweets
        if (req.query.max_id) {
            params.max_id = req.query.max_id;
        }

        T.get('statuses/user_timeline', params, function(err, data, response) {
            return res.json(data);
        });
    });

    app.route('/api/tweets/:tweet_id')
        .delete(function(req, res) {
            var T = new Twit({
                consumer_key: configAuth.twitterAuth.consumerKey,
                consumer_secret: configAuth.twitterAuth.consumerSecret,
                //access_token: req.user.twitter.token,
                //access_token_secret: req.user.twitter.tokenSecret
                access_token: '410441130-xrraADR4q2kImUGL0SNJiqaOJzKDyhG6clBbzGAf',
                access_token_secret: 'fqACGZyHhivdzvK4gnTzAY0UiyIIz9XAWEXT85jo7MMim'
            });

            console.log(req.params);
            var params = {
                id: req.params.tweet_id,
                trim_user: true
            };

            console.log('Deleting tweet with id ' + req.params.tweet_id);
            T.post('statuses/destroy', params, function(err, data, response) {
                res.json({data: data, message: 'Successfully deleted '});
            });
        });

};

