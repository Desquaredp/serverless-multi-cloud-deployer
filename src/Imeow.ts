const imeow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
    version:{
        type:'boolean',
        default: true,
        alias: 'v',
        desc: 'version'
    },

    logs:{
        type:'boolean',
        default: true,
        alias: 'l',
        desc: 'logs'

    }

};

const commands = {

    up: {desc: 'Initiate deployment process'},
    info: {desc: 'Show help for a certain provider'},
    down: {desc: 'Removes the s26r.yml and log files'},
    help: {desc: `Print help info`},
    logs: {desc: 'Prints local logs to the console'},
    version: {desc: 'Console logs the CLI version info'},
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