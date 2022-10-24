#!/usr/bin/env node
const Command = require('commander');
//const meow = require('./help');
//const flags = meow.flags;
//const { clear, debug} = flags;
const cli =  Command;


cli
    .name('s26r')
    .description('s26r offers a simple way to deploy your applications to the cloud.')
    .version('0.0.0')
    // .action(meow.showHelp)

cli.command('up')
    .description('Start deployment process the files  created by this app')
    .action(() => {
        console.log('up')
    });

cli.command('info')
    .description('Show help for a certain provider')
    .action( () => {
    });

cli.command('down')
    .description('Deletes the files  created by this app')
    // .action(commands.prototype.down);

cli.command('logs')
    .description('Prints local logs to the console')
    // .action(commands.prototype.getLogs);

cli.command('help')
    .description('Print help info')
    // .action(meow.showHelp);

cli.command('clear')
    .description('Clear the console')
    // .action(commands.prototype.cleanUp);

cli.command('map')
    .description('Table of the acid aliases for service provider parameters.')
    // .action(commands.prototype.map);
cli.command('wizard')
    .description('Interactive deployment')
    .action(() => {

        }
    );

cli.command('list')
    .description('List of all deployed projects to a certain provider')
    .argument('<provider>', 'provider name')
    .action((provider) => {
    });


cli.command('monitor')
    .description('Provides the health analysis for the deployed applications.')
    .argument('<provider>', 'provider name')
    .action((provider) => {
    });

function parseCLI() {
    cli.parseAsync()
}
parseCLI();

module.exports = parseCLI;
