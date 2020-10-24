import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { URLS } from '../../constants/constants'
import { Brand } from '../../components/brand-filter/brand.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getAllBrands() {
    return this.http.get<{ brands: Brand[] }>(URLS.GET_ALL_BRANDS);
  }
}
