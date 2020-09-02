const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Project = new Schema({
    name: String,
    repository: String,
    path: String,
    deployCommand: String,
    keepUpToDate: Boolean,
    lastUpdate: Date
});

module.exports = mongoose.model('Project', Project);