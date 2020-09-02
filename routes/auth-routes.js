const passport = require('passport');
const User = require('../models/user');
const router = require('express').Router();

router.post('/register', function(req, res, next) {
    console.log('Registering new user');
    User.register(new User({username: req.body.username}), req.body.password, function(err) {
        if (err) {
            console.log('error while registering', err);
            return next(err);
        }

        console.log('User successfully registered');

        res.redirect('/');
    });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    console.log("User logged in");
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    console.log("User logged out");
    req.logout();
    res.redirect('/');
});

module.exports = router;