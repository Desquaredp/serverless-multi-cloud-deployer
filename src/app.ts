#!/usr/bin/env node
import {PluginManager} from "./factory/factory";

const Command = require('commander');
const inter = require('./Imeow');
const plugins = require('./factory/plugin');
const cli =  Command;
import { Commands } from './Commands';
const open = require('open');
import {createOption} from "commander";


cli
    .name('s26r')
    .description('s26r offers a simple way to deploy your applications to the cloud.')
    .version('0.0.1')
    .action(inter.showHelp)


cli.command('up')
    .description('Start deployment process the files  created by this app')
    .action(async () => {
        const instance = new Commands(plugins);
        await instance.up();
    });

cli.command('info')
    .description('Show help for a certain provider')
    .action(async () => {
        const instance = new Commands(plugins);
        await instance.providerHelp();
    });

cli.command('down')
    .description('Deletes the files  created by this app')
    .action(async () => {
            // open(
            //     "https://www.geeksforgeeks.org");
    });

cli.command('logs')
    .description('Prints local logs to the console')
    .action(async () => {
        const instance = new Commands(plugins);
        await instance.logs();
    });

// cli.command('help')
//     .description('Print help info')
//     // .action(inter.showHelp);



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
