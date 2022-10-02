
'use strict';

// function main() {
//     // [START run_v2_generated_Services_DeleteService_async]
//     /**
//      * This snippet has been automatically generated and should be regarded as a code template only.
//      * It will require modifications to work.
//      * It may require correct/in-range values for request initialization.
//      * TODO(developer): Uncomment these variables before running the sample.
//      */
//     /**
//      *  Required. The full name of the Service.
//      *  Format: projects/{projectnumber}/locations/{location}/services/{service}
//      */
//     const name = 'projects/174561353473/locations/us-central1/services/hello';
//     const parent = 'projects/174561353473/locations/us-central1';
//     // const name = 'abc123'
//     /**
//      *  Indicates that the request should be validated without actually
//      *  deleting any resources.
//      */
//     // const validateOnly = true
//     /**
//      *  A system-generated fingerprint for this version of the
//      *  resource. May be used to detect modification conflict during updates.
//      */
//         // const etag = 'abc123'
//
//         // Imports the Run library
//     const {ServicesClient} = require('@google-cloud/run').v2;
//
//     // Instantiates a client
//     const runClient = new ServicesClient();
//
//     async function callDeleteService() {
//         // Construct request
//         const request = {
//             name,
//         };
//
//         // Run request
//         const [operation] = await runClient.deleteService(request);
//         const [response] = await operation.promise();
//
//         // const temp = response.template;
//         const temp = {containers: null };
//         // const container = {image: temp.containers[0].image};
//         const container = {image: response.template.containers[0].image};
//         temp.containers =  [container];
//
//         const service = { template :
//             temp
//         };
//         console.log(service);
//         console.log(service.template.containers);
//         // service.name = '';
//         const serviceId = 'hello';
//
//
//
//         // Construct request
//         const req = {
//             parent,
//             service,
//             serviceId,
//         };
//
//         // Run request
//         const [oper] = await runClient.createService(req);
//         const [res] = await oper.promise();
//        // console.log(res);
//     }
//
//     callDeleteService();
//     // [END run_v2_generated_Services_DeleteService_async]
// }
//
// process.on('unhandledRejection', err => {
//     console.error(err.message);
//     process.exitCode = 1;
// });
// main();