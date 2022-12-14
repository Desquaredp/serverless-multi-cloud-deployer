#!/usr/bin/env node
import {PluginManager} from "./factory/factory";

const Command = require('commander');
const inter = require('./Imeow');
const plugins = require('./factory/plugin');
const cli =  Command;
import { Commands } from './Commands';
const open = require('open');
import {createOption} from "commander";
import {spawn} from "child_process";
import * as path from "path";


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

    });

cli.command('logs')
    .description('Prints local logs to the console')
    .action(async () => {
        const instance = new Commands(plugins);
        await instance.logs();
    });

cli.command('web')
    .description('Open the web interface')
    .action(async () => {
        const server = require('../server/server');

        //exec to the client folder and run npm start
        const child = await spawn('npm', ['start'], {cwd: path.join(__dirname, '../client')});
        child.stdout.on('data', (data) => {

            //supress warnings
            if(data.toString().includes('Compiled with warnings.')){
                return;
            }

            console.log(`stdout: ${data}`);
            if(data.toString().includes('Compiled successfully')){
                open('http://localhost:3000');
            }

        });
        child.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);

        });
        child.on('exit', (code, signal) => {
            console.log(`child process exited with code ${code} and signal ${signal}`);
        });


    } );





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
