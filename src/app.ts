#!/usr/bin/env node
import {PluginManager} from "./factory/factory";

const Command = require('commander');
const inter = require('./Imeow');
const plugins = require('./factory/plugin');
const cli =  Command;
import { Commands } from './Commands';


cli
    .name('s26r')
    .description('s26r offers a simple way to deploy your applications to the cloud.')
    .version('0.0.0')
    .action(inter.showHelp)

cli.command('up')
    .description('Start deployment process the files  created by this app')
    .action(() => {
        const instance = new Commands(plugins);
        instance.up();
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
    // .action(inter.showHelp);

cli.command('clear')
    .description('Clear the console')
    // .action(commands.prototype.cleanUp);


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
