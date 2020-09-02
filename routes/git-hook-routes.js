const router = require('express').Router();
const ProjectManager = require('../utils/projectManager');

router.post('/hook', async function(req, res) {
    var event = req.headers['x-github-event'];
    if (event == 'ping') {
        console.log('Ping event received');
        res.status(204).end();
        return;
    } else if (event != 'push') {
        console.log('Event type ' + event + 'is not supported');
        res.status(304).end();
        return;
    }

    console.log('Push event received, updating...');
    res.status(204).end();

    var url = req.body['repository']['url'];
    var project = await ProjectManager.getProject(url);

    ProjectManager.fetch(project);
    if (project.keepUpToDate) {
        ProjectManager.deploy(project);
    }
});

module.exports = router;