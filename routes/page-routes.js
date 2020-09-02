const router = require('express').Router();
const isLoggedIn = require('../utils/isLoggedIn');

router.get('/login', function(req, res) {
    res.render('login', { layout: 'loginLayout' });
});

router.get('/register', function(req, res) {
    res.render('register', { layout: 'loginLayout' });
});

router.get('/', isLoggedIn, function(req, res) {
    res.render('home', { user: req.user.username});
});

module.exports = router;