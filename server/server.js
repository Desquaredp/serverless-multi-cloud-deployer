// import plugins from "../dist/factory/factory.js";
const plugins = require("../dist/factory/plugin");
const express = require('express');
const app = express();
// const commands = require('../../serverless-multi-cloud-deployer/src/commands');
// import {Commands} from '../dist/Commands.js';
const Commands = require("../dist/Commands");
const instance = new Commands.Commands(plugins);
const providers = instance.getProviders();

// await instance.providerHelp();

// console.log('commands', commands.getProviders());

app.get('/index', (req, res) =>
    //send a json of all the providers from commands
//convert the getProviders() to a json object and send it back
    res.json({response: providers}));



app.listen(5000, () => console.log('App listening on port 5000!'));

