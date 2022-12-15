

import {Provider} from "../abstractProvider";
import {Params} from "./Params";
import {exitOnError} from "winston";
import {ContainerGroup, ContainerInstanceManagementClient} from "@azure/arm-containerinstance";
import {DefaultAzureCredential} from "@azure/identity";
const logger = require('../../logger/index');
const ora = require("ora");

class ContainerInstances extends Provider {


    params: Params;
    containerGroupName: string;
    image: string;
    parent: string;
    cpu: string;
    memoryInGB: string;
    serviceId: string;
    subscriptionId: string;
    location: string;
    resourceGroupName: string;
    port: number;



    paramsList(): string[] {

        let paramsList: string[] = ['subscriptionId', 'resourceGroup', 'location', 'containerGroupName', 'image', 'cpu', 'memoryInGB',  'osType', 'port' ];

        return paramsList;
    }

    async setParams(params: any) {
        this.params = params;
    }

    async deploy(params: any){
        this.resourceGroupName = params.resourceGroup;
        this.containerGroupName = params.containerGroupName;
        this.subscriptionId = params.subscriptionId;
        this.port = params.port;

        //convert port to a number
        if (typeof this.port === 'string') {

            this.port = parseInt(this.port);
        }



        const containerGroup: ContainerGroup = {
            location: params.location,
            containers: [

                {
                    name: params.containerGroupName,
                    image: params.image,
                    ports: [ { port: this.port } ],
                    resources: {
                        requests: {
                            cpu: parseInt (params.cpu),
                            memoryInGB: parseInt( params.memoryInGB),
                        }

                    }

                }

            ],
            osType: params.osType,
            ipAddress: {
                ports: [ { port: this.port, protocol: "TCP" } ],
                type: "Public",
            }

        };


       return this.callCreateService(containerGroup);
    }

    async callCreateService(containerGroup: ContainerGroup): Promise<any> {

        const spinner = ora();
        try {
            const client = new ContainerInstanceManagementClient(new DefaultAzureCredential(), this.subscriptionId);

            spinner.start('Deploying...');
            const value = await client.containerGroups.beginCreateOrUpdate(this.resourceGroupName, this.containerGroupName, containerGroup)

            spinner.succeed('Deployed');
            // console.log(value);

            return value;


        }catch (e) {
            spinner.fail('Failed to deploy!');
            logger.error(e);
            e['error'] = true;

             // console.log(e);

            return e;
        }
    }


    async info(){
        const page = require('./info');
        page();
    }

}
module.exports = ContainerInstances;