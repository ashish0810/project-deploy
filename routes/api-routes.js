const router = require('express').Router();
const isLoggedIn = require('../utils/isLoggedIn');
const Project = require('../models/project');

router.get('/api/projects', isLoggedIn, function(req,res) {
    console.log('Retreiving projects');
    Project.find(function (err, docs) {
        res.status(200).json(docs);
    });
});

router.post('/api/projects', isLoggedIn, function(req,res) {
    console.log('Adding new project...');
    var p = new Project();
    p.name = req.body.name;
    p.repository = req.body.repository;
    p.path = req.body.path;
    p.deployCommand = req.body.deployCommand;
    p.keepUpToDate = req.body.keepUpToDate;
    p.save(function (err) {
        if (err) {
            console.log('Fail');
            console.error(err);
            res.status(400).end();
        } else {
            console.log('Success');
            res.status(200).end();
        }
    });
});

module.exports = router;