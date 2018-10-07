const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cors = require('cors');
const index = require('routes/index.js');
const userRoutes = require('routes/users.js');
const botRoutes = require('routes/bots.js');
const staticRoutes = require('routes/static.js');
const validator = require('express-validator');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO: use a better secret...
app.use(session({
    secret: 'it\'s really a secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(flash());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use(validator({}));
app.use('/', index);
app.use('/user', userRoutes);
app.use('/bots', botRoutes);
app.use('/static', staticRoutes);

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
    res.status(err.status || 500).json({
        message: err.message,
        error: err,
    });
});

module.exports = app;
