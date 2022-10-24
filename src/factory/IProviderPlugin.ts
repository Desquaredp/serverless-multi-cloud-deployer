export interface IProviderPlugin {
    name: string;
    templateFile: string;
    location: string;
    instance?: any;
}