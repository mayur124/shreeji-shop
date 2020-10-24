import { Page } from "../../models/page.model";
import { PhoneModel } from "../../models/phone-model.model";

export class PhoneData {
    data: BrandModelMap[];
    paginationData: Page;
}

export class BrandModelMap {
    brandId: number;
    model: PhoneModel[]
}