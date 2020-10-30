import { Page } from "./page.model";
import { PhoneModel } from "./phone-model.model";

export class PhoneData {
    data: BrandModelMap[];
    paginationData: Page;
}

export class BrandModelMap {
    brandId: number;
    brandName: string;
    model: PhoneModel[]
}