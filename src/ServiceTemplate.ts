import {google} from "@google-cloud/run/build/protos/protos";
import RevisionTemplate = google.cloud.run.v2.RevisionTemplate;

const container = {

    image: 'gcr.io/hello-world-172023/league@sha256:27b7129fc64c25a6a83fbdaf0614ecdccc985971146dfe58440a2c9bb1c81f51'
}

const service = {
    // name: 'projects/hello-world-172023/locations/us-central1/services/league2',

    template: {
        containers: [container],
        serviceAccount: 'local-docker-service@hello-world-172023.iam.gserviceaccount.com',

    },

}


module.exports = service;
