/**
 *
 * This contains the factory that registers and loads plugins.
 * **/
import {write} from "fs";

const Pro = require("./abstractProvider");
//const ProviderPlugin = require("./IProviderPlugin");
import {IProviderPlugin} from './IProviderPlugin';


/**
 * Class to manage all the plugins**/
export class PluginManager{
    private pluginList: Map<string, IProviderPlugin>;

    constructor() {
        this.pluginList = new Map();
    }

    /**
     * Method to check if the plugin is already registered
     * @param {string} Takes in the name of the plugin
     * @returns {void}
     * **/
    private pluginExists(name: string): boolean {
        return this.pluginList.has(name);
    }
    /**
     * Method that adds the plugin.
     * @param {ProviderPlugin, any} Takes in the plugin and the package contents
     * @returns {void}
     * **/
    private addPlugin(plugin: IProviderPlugin, packageContents: any): void{
        this.pluginList.set(plugin.name, {...plugin, instance: packageContents});
    }

    /**
     * Method to register a plugin.
     * @param {ProviderPlugin} Takes in the plugin to be registered.
     * @returns {void}
     * **/

    registerPlugin(plugin: IProviderPlugin): void {
        if (!plugin.name || !plugin.templateFile) {
            throw new Error('The plugin name and template file are required');
        }

        if (this.pluginExists(plugin.name)) {
            throw new Error(`Cannot add existing plugin ${plugin.name}`);
        }

        try {
            // Try to load the plugin
            const packageContents = require(`./${plugin.location}`);//plugin.name);
            this.addPlugin(plugin, packageContents);
        } catch (error) {
            console.log(`Cannot load plugin ${plugin.name}`, error);
        }
    }

    /**
     * Method to load a plugin.
     * @param {string, any[]} Takes in the name of the plugin and the properties to be passed to the plugin
     * @returns {T} Returns the plugin instance.
     * **/
    loadPlugin<T>(name: string, properties: any[]): T {
        const plugin = this.pluginList.get(name);
        if (!plugin) {
            throw new Error(`Cannot find plugin ${name}`);
        }
        let obj = Object.create(plugin.instance.prototype);
        obj = new obj.constructor(properties);
        return obj as T;
    }

    listPluginList(): IterableIterator<string>{
        return this.pluginList.keys()[Symbol.iterator]();
    }

    /**
     * Method returns the path to the template file
     * @param name service provider
     */
    provTemplate(name: string): string{
        if (name == null){
            throw new Error('No provider selected for template')
        }

        return this.pluginList.get(name).templateFile;
    }

}
