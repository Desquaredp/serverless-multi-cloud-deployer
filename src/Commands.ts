import {PluginManager}  from './factory/factory';
const inquirer = require('inquirer');
import {Provider} from "./factory/abstractProvider";

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
        console.log(providers);

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
        console.log( providerInstance.paramsList());


    }
}
