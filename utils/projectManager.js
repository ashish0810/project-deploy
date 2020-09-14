const mongoose = require('mongoose');
const { exec, execSync } = require("child_process");
const Project = require('../models/project');

const ProjectManager =  {
    async getAll() {
        const projects = await Project.find({});
        return projects;
    },

    async addProject(project) {
        project.keepUpToDate = project.keepUpToDate == "on";
        var r = await Project.create(project);
        return r;
    },

    async editProject(project) {
        project.keepUpToDate = project.keepUpToDate == "on";
        var r = await Project.updateOne({ name: project.name }, project);
        return r;
    },

    async deleteProject(name) {
        var r = await Project.deleteOne({ name: name });
        return r;
    },

    async getProject(url) {
        var project = await Project.findOne({ repository: url });
        console.log('Pulled project information for ' + project.name + ' based on url ' + url);
        return project;
    },

    fetch(project) {
        console.log('Pulling latest changes to repository');
        var cmd = `cd ${project.path} && git pull`;
        // console.log(cmd);
        var stdout = execSync(cmd);
        // console.log(`stdout: ${stdout}`);
        // console.log(`${cmd} finished`);
    },

    deploy(project) {
        console.log('Deploying latest changes to repository');
        var cmd = `cd ${project.path} && ${project.deployCommand}`;
        // console.log(cmd);
        var stdout = execSync(cmd);
        // console.log(`stdout: ${stdout}`);
        project.lastUpdate = new Date();
        project.save();
        // console.log(`${cmd} finished`);
    },
}

module.exports = ProjectManager;