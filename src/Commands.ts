import {PluginManager}  from './factory/factory';
const inquirer = require('inquirer');
import {Provider} from "./factory/abstractProvider";
const ora = require("ora");
const logger = require('./logger/index');
const chalk = require('chalk');

const yaml = require('js-yaml');
const fs = require('fs');


export class Commands{

    manager: PluginManager;

    constructor(manager: PluginManager) {
        this.manager = manager;
    }

    getProviders(): String[]{
       let val:IterableIterator<string> =  this.manager.listPluginList();
       let arr: String[] = [];
         for (let i of val){
             arr.push(i);
         }
       return arr;
    }

    async up(){

        let obj: object = null;
        try{
            logger.info("Finding pre-existing s26r.yml file");

            obj = await this.parseYaml('./s26r.yml');

        }catch (err){

            logger.info("s26r.yml file either corrupted or not found");
            logger.info("Initializing new s26r.yml file");

        }

        if(obj != null){
            logger.info("s26r.yml found!");

            try {


                const provider = await obj['provider'];
                const providerInstance: Provider = await this.manager.loadPlugin(provider, obj);
                const deploy = await providerInstance.deploy(obj);

            }catch (err){

                logger.error("Error in deployment");
                logger.error(err);
            }

        }else{
            await this.noFileFoundProtocol();
        }


    }

    async noFileFoundProtocol(): Promise<void> {

        let providers = this.getProviders();

        const provider =await inquirer.prompt([
            {
                type: 'list',
                message: "Pick a provider to deploy to",
                name: 'provider',
                choices: providers,
            }
        ]).then (answers => {

            return answers.provider;

        });

        const providerInstance: Provider = await this.manager.loadPlugin(provider, null);
        const listOfParams: string[] =  providerInstance.paramsList();
        let query: any[] = [];

        for (let param of listOfParams){
            query.push({
                type: 'input',
                name: param,
                message: `Please fill the value for ${param}: `
            });
        }

        const requiredVals = await inquirer.prompt(query).then(answers => {

            return answers;
        });

        for(const [key, value] of Object.entries(requiredVals)) {
            if(value == null || value == ""){
                logger.warn( `The value for ${key} is empty, this may prevent the deployment from working`);
            }
        }


        await providerInstance.deploy(requiredVals);



        requiredVals['provider'] = provider.toString();
        await this.writeFile("s26r.yml" , requiredVals);



    }

    async logs(){

        try{
            logger.info("Fetching logs");
            const errorFile =  fs.readFileSync('error.log', 'utf8');
            const combinedFile = fs.readFileSync('combined.log', 'utf8');

            const files = ['Error log', 'Combined log'];

            const file =await inquirer.prompt([
                {
                    type: 'list',
                    message: "Pick the log to view",
                    name: 'file',
                    choices: files,
                }
            ]).then (answers => {

                return answers.file;

            });

            if(file == 'Error log'){
                console.log(chalk.red(errorFile));
            }else if(file == 'Combined log'){
                console.log(chalk.green(combinedFile));
            }





        }catch (err){

            logger.error("Error in fetching logs");
            logger.error(err);
        }

    }

    async parseYaml(filePath: string): Promise<object>   {

        try {
            const json = yaml.load(fs.readFileSync(filePath, 'utf8'));
            return json;
        } catch (err) {
            throw new Error(err);
        }

    }


    async writeFile(filePath: string, json: any): Promise<void> {

        try {
            fs.writeFileSync(filePath, this.jsonToYaml(json));
        } catch (err) {
            throw new Error(err);
        }
    }


    /**
     * This function takes in a .json object and returns a .yaml formatted text.
     * @param json
     * @returns {string} yaml formatted text
     */
    jsonToYaml(json: object): string {
        return yaml.dump(json);
    }
}
