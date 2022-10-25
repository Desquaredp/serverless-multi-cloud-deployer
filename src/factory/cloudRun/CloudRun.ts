import {Provider} from "../abstractProvider";
import {Params} from "./Params";

 class CloudRun extends Provider {

    params: Params;

    paramsList(): string[] {

        let paramsList: string[] = ['projectNumber', 'location', 'serviceId', 'image'];

        return paramsList;
    }

}
module.exports = CloudRun;