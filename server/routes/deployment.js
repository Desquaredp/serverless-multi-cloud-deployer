const express = require('express');
const app = express();
const router = express.Router();

const Commands = require("../../dist/Commands");
const plugins = require("../../dist/factory/plugin");
const instance = new Commands.Commands(plugins);
const providers = instance.getProviders();


router.get('/', (req, res) => {
    console.log('req', req);
    res.send('Hello World!');
    res.json({response: 'Hello World'})
});

//use the router to get json data from the server

router.use(express.json());


router.post('/', (req, res) => {


    console.log('hello world');

    //get the selected option from the client
    console.log('req.body', req.body);
    const provider = req.body.formData.selectedOption;

    // async deployment = await instance.deployToProvider(req.body.formData, provider);

    //call the deployToProvider function and await the response
    //create an async function to await the response
    deployment(req.body.formData, provider).then((response) => {
        console.log('response', response);
        res.json({response: response});
    });


});

async function deployment(formData, provider) {
    const deployment = await instance.deployToProvider(formData, provider);
    return deployment;
}



module.exports = router;