import { Page } from "./page.model";
import { PhoneModel } from "./phoneModel.model";

export class PhoneData {
    data: BrandModelMap[];
    paginationData: Page;
}

export class BrandModelMap extends PhoneModel {
    brandId: number;
    brandName: string;
}