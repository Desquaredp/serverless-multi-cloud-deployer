// import plugins from "../dist/factory/factory.js";
const plugins = require("../dist/factory/plugin");
const express = require('express');
const app = express();
// const commands = require('../../serverless-multi-cloud-deployer/src/commands');
// import {Commands} from '../dist/Commands.js';
const Commands = require("../dist/Commands");
const instance = new Commands.Commands(plugins);
const providers = instance.getProviders();


const deployment = require('./routes/deployment');
app.use('/deployment', deployment);
// await instance.providerHelp();

// console.log('commands', commands.getProviders());

app.get('/index', (req, res) =>{
    //send a json of all the providers from commands
//convert the getProviders() to a json object and send it back
    res.json({response: providers}
    )});


app.use(express.json());


app.post('/index', (req, res) => {
    //get the selected option from the client
    console.log('req.body', req.body);
    const selectedOption = req.body.selectedOption;
    console.log('selectedOption', selectedOption);
    //send the selected option to the server
    // res.json({response: selectedOption});
    //run the selected option
   // const providerInstance=  this.manager.loadPlugin( selectedOption , null);
    const providerInstance = instance.getManager().loadPlugin(selectedOption, null);

    const listOfParams=  providerInstance.paramsList();
    console.log('listOfParams', listOfParams);


    //send response back to the client with the list of params
    res.json({response: listOfParams

    });




});




app.listen(5000, () => console.log('App listening on port 5000!'));

