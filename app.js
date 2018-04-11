var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
var sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');
const cors = require('cors');
// Config
const config = require('./server/config');

// Configure Passport to use Auth0
// const strategy = new Auth0Strategy(
//   {
//     domain: 'dota-bot-scripting.eu.auth0.com',
//     clientID: 'kYw-F9JzITYkyDZoQUiFE5PGqkeAvB_H',
//     clientSecret: 'qdv6c__7UyeHeMA-IBejBVd9JyMJpA1d2VLLqSwNkm3ixKgfONk3-Op-UGGd3dR3',
//     callbackURL: 'http://localhost:3000/callback'
//   },
//   (accessToken, refreshToken, extraParams, profile, done) => {
//     return done(null, profile);
//   }
// );

// passport.use(strategy);

// This can be used to keep a smaller payload
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors());


/* START TUTORIAL */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

// Set port
const port = process.env.PORT || '8083';
app.set('port', port);

// Set static path to Angular app in dist
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
    app.use('/', express.static(path.join(__dirname, './dist')));
}

/*
 |--------------------------------------
 | Routes
 |--------------------------------------
 */

require('./server/api')(app, config);

// Pass routing to Angular app
// Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
}

/* END TUTORIAL */


/*

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(
  session({
    secret: 'it\'s really a secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


// Handle auth failure error messages
app.use(function(req, res, next) {
 if (req && req.query && req.query.error) {
   req.flash("error", req.query.error);
 }
 if (req && req.query && req.query.error_description) {
   req.flash("error_description", req.query.error_description);
 }
 next();
});

// Check logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});


app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;