var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('./auth');

var router = express.Router();

//Controllers
var posts = require('./routes/posts');
var users = require('./routes/users');

var admin = express(); // the sub app
admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'jade');

admin.use(passport.initialize());
admin.use(passport.session());

admin.use(function(req, res, next) {
    if (req.user == null && req.path.indexOf('/login') === 0 && admin.mountpath == '/admin') {
        next(); 
    } else if (req.user == null && req.path.indexOf('/public') === 0 && admin.mountpath == '/admin') {
        next(); 
    } else if (req.user == null && admin.mountpath == '/admin') {
        res.redirect('/admin/login');
    }
    next(); 
});

admin.use('/posts', posts);
admin.use('/users', users);

// accept GET request on the admin index via /
admin.get('/', function(req, res, next) {
    res.send('Got a GET request at /admin/');
});

// accept GET request on the admin dashboard via /dashboard
admin.get('/dashboard', function(req, res, next) {
    res.send('Got a GET request at /admin/dashboard');
});

// accept GET request on the admin login via /login
admin.get('/login', function(req, res, next) {
    //res.send('Got a GET request at /admin/login');
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.render('login', {title: 'Login'});
        }

        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect('/admin');
        });
    })(req, res, next);
});

admin.post('/login', passport.authenticate('local', {
    failureRedirect: '/admin/login',
    successRedirect: '/admin'
}));

module.exports = admin;