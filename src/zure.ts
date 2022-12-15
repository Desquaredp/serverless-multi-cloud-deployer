import * as aci from "@azure/arm-containerinstance";
import * as msRest from "@azure/ms-rest-js";

const subscriptionId = "your-subscription-id";
const resourceGroup = "your-resource-group";
const location = "your-location";
const containerGroupName = "your-container-group-name";
const imageName = "your-container-image-name";

async function main() {
    // create an Azure client
    const client = new aci.ContainerInstanceManagementClient(
        new msRest.TokenCredentials("your-access-token"),
        subscriptionId
    );

    // define the container group
    const containerGroup: aci.models.ContainerGroup = {
        location: location,
        containers: [
            {
                name: containerGroupName,
                image: imageName,
                resources: {
                    requests: {
                        cpu: 1,
                        memoryInGB: 1.5,
                    },
                },
            },
        ],
        osType: "Linux",
    };

    // create the container group
    const result = await client.containerGroups.createOrUpdate(
        resourceGroup,
        containerGroupName,
        containerGroup
    );
    console.log("Container group deployed:", result);
}

main().catch((err) => {
    console.error("Failed to deploy container group:", err);
});