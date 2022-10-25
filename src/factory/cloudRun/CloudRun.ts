import {Provider} from "../abstractProvider";
import {Params} from "./Params";
import {exitOnError} from "winston";
const logger = require('../../logger/index');

 class CloudRun extends Provider {

    params: Params;
    parent: string;
    serviceId: string;
    service: any;

    paramsList(): string[] {

        let paramsList: string[] = ['projectNumber', 'location', 'serviceId', 'image'];

        return paramsList;
    }

    async setParams(params: any) {
        this.params = params;
    }

    async deploy(params: any){


       this. parent= this.formParent(params.projectNumber, params.location);
       this. serviceId= params.serviceId;
       this. service= {template: null};
       const container: object = {image: params.image};
       this.service.template = {containers: [container]};
       if (params.serviceAccount){
           this.service.template.serviceAccount = params.serviceAccount;
       }

         return await this.callCreateService();

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
        try {
            const [operation] = await client.createService(request);
            const [response] = await operation.promise();
            return response;
        }catch (e) {
            logger.error(e);
            return e;
        }
    }

    formParent(projectNumber: string, location: string): string{
        let parent = `projects/${projectNumber}/locations/${location}`;
        return parent;
    }





}
module.exports = CloudRun;