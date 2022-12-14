import {Provider} from "../abstractProvider";
import {Params} from "./Params";
import {exitOnError} from "winston";
const logger = require('../../logger/index');
const ora = require("ora");

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
        console.log(params);


       this. parent= this.formParent(params.projectNumber, params.location);
       this. serviceId= params.serviceId;
       this. service= {template: null};
       const container: object = {image: params.image.toString(),
          };

      // console.log(container);
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

        const spinner = ora();
        try {

            spinner.start('Deploying...');
            const [operation] = await client.createService(request);
            const [response] = await operation.promise();
            spinner.succeed('Deployed');

            //console.log('The response is: ' ,response);
            return response;

        }catch (e) {
            spinner.fail('Failed to deploy!');
            logger.error(e);
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
module.exports = CloudRun;