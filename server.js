var express = require('express');
var passport = require('passport');

var morgan = require('morgan');
var session = require('express-session');
var path = require('path');

require('./config/passport')(passport); // pass passport for configuration

var app = express();
var port = process.env.PORT || 8080;

app.use(morgan('dev')); // log requests to the browser

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// serve node modules to /scripts
// this is necessary to grab front-end libraries from node_modules
// because it isn't hosted otherwise
// TODO: NOTE: http://stackoverflow.com/questions/27464168/how-to-include-scripts-located-inside-the-node-modules-folder
// TODO: understand why it's plus and not , 'node_modules'
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));


// required for passport
app.use(session({secret: 'cleanyoursocialhistory' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes.js')(app, passport); // load routes, pass app and configured passport

// launch
app.listen(port);
console.log('Server running on ' + port);
