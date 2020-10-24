import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URLS } from '../../constants/constants'
import { Brand } from '../../models/brand.model';
import { PhoneData } from 'src/app/components/home/home.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getAllBrands() {
    return this.http.get<{ brands: Brand[] }>(URLS.GET_ALL_BRANDS);
  }

  getPhoneModelsByBrandIds(brandIds: string, page: number = 0, sort: string = "") {
    return this.http.get<PhoneData>(URLS.FILTER + "?brandIds=" + brandIds + "&page=" + page + "&sort=" + sort);
  }

  getDefaultPhoneModels() {
    return this.http.get<PhoneData>(URLS.FILTER);
  }
}
