const plugins = require("../dist/factory/plugin");
const express = require('express');
const app = express();

const Commands = require("../dist/Commands");
const instance = new Commands.Commands(plugins);
const providers = instance.getProviders();

app.use(express.static('public'));


const deployment = require('./routes/deployment');
app.use('/deployment', deployment);

app.get('/index', (req, res) =>{

    res.json({response: providers} )});


app.use(express.json());


app.post('/index', (req, res) => {
    const selectedOption = req.body.selectedOption;

    const providerInstance = instance.getManager().loadPlugin(selectedOption, null);

    const listOfParams=  providerInstance.paramsList();


    res.json({response: listOfParams  });




});




app.listen(5000, () => console.log('Server started on port 5000'));

