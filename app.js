const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const cors = require('cors');
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
}));

app.use(session({
    secret: 'it\'s really a secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());


app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


/**
 * Stuff that doesn't seem to be working too well for us
 * */

// Set port
// const port = process.env.PORT || '3000';
// app.set('port', port);

// Set static path to Angular app in dist
// Don't run in dev
// if (process.env.NODE_ENV !== 'dev') {
//     app.use('/', express.static(path.join(__dirname, './dist')));
// }

/*
 |--------------------------------------
 | Routes
 |--------------------------------------
 */

// require('./server/api')(app, config);

// Pass routing to Angular app
// Don't run in dev
// if (process.env.NODE_ENV !== 'dev') {
//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, '/dist/index.html'));
//     });
// }

