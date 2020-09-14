const router = require('express').Router();
const isLoggedIn = require('../utils/isLoggedIn');
const ProjectManager = require('../utils/projectManager');

router.get('/login', function(req, res) {
    res.render('login', { layout: 'loginLayout' });
});

router.get('/register', function(req, res) {
    res.render('register', { layout: 'loginLayout' });
});

router.get('/', isLoggedIn, async function(req, res) {
    const projects = await ProjectManager.getAll();
    res.render('home', {
        user: req.user.name,
        projects: projects
    });
});

module.exports = router;