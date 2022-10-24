export interface Params {

    //The project's number(only digits).
    projectNumber: string;
    //The location of the project.(ex. us-central1)
    location: string;


    //Name of the service(shows up as the service name in the cloud run console)
    serviceId: string;
    //The image that is to be deployed. This image must exist in the container registry.
    image: string;
    serviceAccount?: string;

}
