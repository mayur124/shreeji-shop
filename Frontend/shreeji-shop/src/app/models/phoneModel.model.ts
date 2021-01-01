export class PhoneModel {
    announced: string;
    audioJack: string;
    phoneId: number;
    imgUrl: string;
    name: string;
    status: string;
    
    //#region general attributes
    ram: string;
    battery: string;
    bluetooth: string;
    chipset: string;
    colors: string;
    cpu: string;
    gpu: string;
    os: string;
    priceEur: any;
    sensors: string;
    speaker: string; 
    usb: string;
    weightG: string;
    //#endregion

    //#region display attributes
    dimensions: string;
    displayResolution: string;
    displaySize: string;
    displayType: string;
    //#endregion

    //#region camera attributes
    primaryCamera: string;
    secondaryCamera: string;
    //#endregion

    //#region storage attributes
    internalMemory: string;
    memoryCard: string;
    //#endregion

    //#region network attributes
    bands2g: string;
    bands3g: string;
    bands4g: string;
    edge: string;
    gprs: string;
    gps: string;
    networkSpeed: string;
    networkTechnology: string;
    sim: string;
    wlan: string;
    //#endregion
}