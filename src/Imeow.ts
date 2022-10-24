const imeow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
    version:{
        type:'boolean',
        default: true,
        alias: 'v',
        desc: 'version'
    }
};

const commands = {

    up: {desc: 'Initiate deployment process'},
    info: {desc: 'Show help for a certain provider'},
    map: {desc: 'Table of the acid aliases for service provider parameters.'},
    down: {desc: 'Removes the acid.yml and log files'},
    help: {desc: `Print help info`},
    logs: {desc: 'Prints local logs to the console'},
    wizard: {desc: 'Interactive deployment'},
    version: {desc: 'Console logs the CLI version info'},
    list: {desc: 'List of all deployed projects to a certain provider'},
    monitor: {desc: 'Provides the health analysis for the deployed applications.'}
};

const helpText = meowHelp({
    name: `s26r`,
    version: `0.0.1`,
    defaults: false,
    flags,
    commands
});

const options = {
    inferType: true,
    description: false,
    hardRejection: false,
    flags
};


module.exports = imeow(helpText, options);