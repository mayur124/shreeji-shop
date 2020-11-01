import { Page } from "./page.model";
import { PhoneModel } from "./phone-model.model";

export class PhoneData {
    data: BrandModelMap[];
    paginationData: Page;
}

export class BrandModelMap extends PhoneModel {
    brandName: string;
}