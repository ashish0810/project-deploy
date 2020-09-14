const router = require('express').Router();
const isLoggedIn = require('../utils/isLoggedIn');
const ProjectManager = require('../utils/projectManager');

router.get('/api/projects', isLoggedIn, async function(req,res) {
    console.log('Retreiving projects');
    var projects = await ProjectManager.getAll();
    res.status(200).json(projects);
});

router.post('/api/projects', isLoggedIn, async function(req,res) {
    console.log('Adding new project');
    var r = await ProjectManager.addProject(req.body);
    res.redirect('/');
});

router.post('/api/projects/edit', isLoggedIn, async function(req,res) {
    console.log('Editing project');
    var r = await ProjectManager.editProject(req.body);
    res.redirect('/');
});

router.post('/api/projects/delete', isLoggedIn, async function(req,res) {
    console.log('Deleteing project');
    if (req.body.confirm) {
        var r = await ProjectManager.deleteProject(req.body.name);
    }
    res.redirect('/');
})

module.exports = router;