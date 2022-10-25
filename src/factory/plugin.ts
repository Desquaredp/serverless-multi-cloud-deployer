/**
 * This file is to register all the plugins to the plugin manager.
 * It also channels the info manager object to the UI or where ever we process the loading of one of these
 * plugins.
 **/

import {PluginManager} from './factory';

const manager = new PluginManager();

manager.registerPlugin({
    name: 'GCP Cloud Run',
    templateFile: './bin/PROVIDERS/templates/gcloud_run_tmpl.json',
    location: './cloudRun/CloudRun'
});


manager.registerPlugin({
    name: 'Azure Container Instance',
    templateFile: './bin/PROVIDERS/templates/azure_appinst_tmpl.json',
    location: './cloudRun/CloudRun'
});

module.exports = manager;
