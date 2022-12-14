const express = require('express');
const app = express();
const router = express.Router();

const Commands = require("../../dist/Commands");
const plugins = require("../../dist/factory/plugin");
const instance = new Commands.Commands(plugins);
const providers = instance.getProviders();


router.get('/', (req, res) => {


});

//use the router to get json data from the server

router.use(express.json());


router.post('/', (req, res) => {

    const provider = req.body.formData.selectedOption;

     deployment(req.body.formData, provider).then((response) => {
        res.json({response: response});
    });


});

async function deployment(formData, provider) {
    const deployment = await instance.deployToProvider(formData, provider);
    return deployment;
}



module.exports = router;