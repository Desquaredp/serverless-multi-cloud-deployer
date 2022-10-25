import {PluginManager}  from './factory/factory';
const inquirer = require('inquirer');
import {Provider} from "./factory/abstractProvider";
const ora = require("ora");

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
        const spinner = ora({
            text: '',
        });

        spinner.start('Deploying...');
        providerInstance.deploy(requiredVals);
        spinner.stop();



    }
}
