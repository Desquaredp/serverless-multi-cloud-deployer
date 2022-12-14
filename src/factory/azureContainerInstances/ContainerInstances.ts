// import * as azure from '@azure/arm-containerinstance/esm/models';
// import { DefaultAzureCredential } from "@azure/identity";
// import {subscriptionId} from "@azure/arm-containerinstance/dist-esm/src/models/parameters";
//
// // Replace these values with your own resource group name and container instance name
// const resourceGroupName = "my-resource-group";
// const containerInstanceName = "my-container-instance";
//
// // Replace this value with the name of your image
// const imageName = "my-image:latest";
//
// // Create the container group
// const containerGroup: azure.ContainerGroup = {
//     location: "westus",
//     containers: [
//         {
//             name: containerInstanceName,
//             image: imageName,
//             resources: {
//                 requests: {
//                     cpu: 1,
//                     memoryInGB: 1
//                 }
//             }
//         }
//     ],
//     osType: "Linux"
// };
//
// // Use the Azure Container Instance client to create the container group
// const credential = new DefaultAzureCredential();
// const containerGroupsClient = new ContainerGroupsClient(credential, subscriptionId);
// const result = await containerGroupsClient.containerGroups.createOrUpdate(resourceGroupName, containerInstanceName, containerGroup);

import {Provider} from "../abstractProvider";
import {Params} from "./Params";
import {exitOnError} from "winston";
import {DefaultAzureCredential} from "@azure/identity";
// import {resourceGroupName, subscriptionId} from "@azure/arm-containerinstance/dist-esm/src/models/parameters";
const logger = require('../../logger/index');
const ora = require("ora");

class ContainerInstances extends Provider {


    params: Params;
    containerInstanceName: string;
    imageName: string;
    parent: string;
    cpu: string;
    memoryInGB: string;
    serviceId: string;
    service: any;
    token: string;
    resourceGroupName: string;



    paramsList(): string[] {

        let paramsList: string[] = ['subscriptionId', 'resourceGroup', 'location', 'containerGroupName', 'imageName', 'cpu', 'memoryInGB',  'osType'];

        return paramsList;
    }

    async setParams(params: any) {
        this.params = params;
    }

    async deploy(params: any){


        // @ts-ignore
        const containerGroup: azure.ContainerGroup = {
    location: "westus",
    containers: [
        {
            token: this.token,
            name: this.containerInstanceName,
            image: this.imageName,
            resources: {
                requests: {
                    // @ts-ignore
                    cpu: this.cpu,
                    memoryInGB: this.memoryInGB
                }
            }
        }
    ],
    osType: "Linux"
};

// Use the Azure Container Instance client to create the container group
        let credential: DefaultAzureCredential;
        credential = new DefaultAzureCredential();
// @ts-ignore
        const containerGroupsClient = new ContainerGroupsClient(credential, subscriptionId);
const result = await containerGroupsClient.containerGroups.createOrUpdate(this.resourceGroupName, this.containerInstanceName, containerGroup);
return result;

    }

    async callCreateService(): Promise<any> {
        const {ServicesClient} = require('@google-cloud/run').v2;
        const client = new ServicesClient();
        const parent = this.parent;
        const serviceId = this.serviceId;
        const service = this.service;
        const request = {
            parent,
            service,
            serviceId,
        };

        const spinner = ora();
        try {

            spinner.start('Deploying...');
            const [operation] = await client.createService(request);
            const [response] = await operation.promise();
            spinner.succeed('Deployed');

            return response;

        }catch (e) {
            spinner.fail('Failed to deploy!');
            logger.error(e);
            e['error'] = true;


            return e;
        }
    }

    formParent(projectNumber: string, location: string): string{
        let parent = `projects/${projectNumber}/locations/${location}`;
        return parent;
    }

    async info(){
        const page = require('./info');
        page();
    }




}
module.exports = ContainerInstances;