import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SORT_TYPE } from 'src/app/constants/constants';
import { Page } from 'src/app/models/page.model';
import { HttpService } from 'src/app/services/http/http.service';
import { PhoneData } from "../../models/home.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phoneModelSubject: Subject<PhoneData> = new Subject();
  paginationSub: Subject<{ brandIds: string, paginationData: Page }> = new Subject();

  brandIds: string;
  sortType: SORT_TYPE;

  constructor(private http: HttpService,) { }

  ngOnInit(): void {
    this.getDefaultPhones();
  }

  private getDefaultPhones(page?: number) {
    this.http.getDefaultPhoneModels(page, this.sortType).subscribe(
      (response: PhoneData) => {
        this.paginationSub.next({ brandIds: '', paginationData: response.paginationData });
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }
  private getModelsForSelectedBrands(brandIds: string, page?: number) {
    this.http.getPhoneModelsByBrandIds(brandIds, page, this.sortType).subscribe(
      (response: PhoneData) => {
        this.brandIds = brandIds;
        this.paginationSub.next({ brandIds: brandIds, paginationData: response.paginationData });
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }
  getPhonesForSelectedBrandsSafe(brandIds: string) {
    if (!brandIds || !brandIds.length) {
      this.getDefaultPhones();
    } else {
      this.getModelsForSelectedBrands(brandIds);
    }
  }
  performPagination(event: { isBrandsSelected: boolean, pageNo: number }) {
    if (event.isBrandsSelected) {
      this.getDefaultPhones(event.pageNo);
    } else {
      this.getModelsForSelectedBrands(this.brandIds, event.pageNo);
    }
  }
  sortPhones(sortType: SORT_TYPE) {
    this.sortType = sortType;
    this.getPhonesForSelectedBrandsSafe(this.brandIds);
  }
}
