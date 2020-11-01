import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SORT_TYPE, URLS } from '../../constants/constants'
import { Brand } from '../../models/brand.model';
import { BrandModelMap, PhoneData } from 'src/app/models/home.model';
import { PhoneModel } from 'src/app/models/phone-model.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getAllBrands() {
    return this.http.get<{ brands: Brand[] }>(URLS.GET_ALL_BRANDS);
  }

  getPhoneModelsByBrandIds(brandIds: string, page: number = 0, sort: SORT_TYPE = "") {
    if (sort == "") {
      return this.http.get<PhoneData>(URLS.FILTER + "?brandIds=" + brandIds + "&page=" + page);
    }
    return this.http.get<PhoneData>(URLS.FILTER + "?brandIds=" + brandIds + "&page=" + page + "&sort=" + sort);
  }

  getDefaultPhoneModels(page: number = 0, sort: SORT_TYPE = "") {
    if (sort == "") {
      return this.http.get<PhoneData>(URLS.FILTER + "?page=" + page);
    }
    return this.http.get<PhoneData>(URLS.FILTER + "?page=" + page + "&sort=" + sort);
  }

  getPhoneDetails(phoneId: number) {
    return this.http.get<PhoneModel>(URLS.PHONE_DETAIL + "?phoneId=" + phoneId);
  }

  getSimilarPhones(brandId: number, phoneId: number) {
    return this.http.get<BrandModelMap[]>(URLS.SIMILAR_PHONES + "?brandId=" + brandId + "&phoneId=" + phoneId);
  }
}
