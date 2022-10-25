/**
 *
 * This is an abstract class that provides a blueprint for the providers  **/

export abstract class Provider {

    constructor( properties: any) {
    }
    abstract paramsList(): string[];
    abstract deploy(params: any );
    abstract info();

    // abstract initialize(): void;
    // abstract auth(): void;
    // abstract tag(ImageID: string): Promise<string>;
    // abstract push(): void;
    // abstract deploy(template: any): void;
    // abstract getDeployedApps(): object;
    // abstract terminate(): void;
    // abstract monitor(): void;
    // abstract helpDocs(page : string): void;

    //TODO: add methods that are to be executed when the provider is loaded,
}
