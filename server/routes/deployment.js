const express = require('express');
const app = express();
const router = express.Router();

const Commands = require("../../dist/Commands");
const plugins = require("../../dist/factory/plugin");
const instance = new Commands.Commands(plugins);


router.get('/', (req, res) => {


});


router.use(express.json());


/**
 *  /deployment route
 * **/
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