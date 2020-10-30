import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SORT_TYPE } from 'src/app/constants/constants';
import { Page } from 'src/app/models/page.model';
import { CommonService } from 'src/app/services/common/common.service';
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

  constructor(private http: HttpService,
    private common: CommonService) { }

  ngOnInit(): void {
    this.getDefaultPhones();
    this.common.setTagline("Own your latest one");
  }

  private getDefaultPhones(page?: number, sort?: SORT_TYPE) {
    this.http.getDefaultPhoneModels(page, sort).subscribe(
      (response: PhoneData) => {
        this.paginationSub.next({ brandIds: '', paginationData: response.paginationData });
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }
  private getModelsForSelectedBrands(brandIds: string, page?: number, sort?: SORT_TYPE) {
    this.http.getPhoneModelsByBrandIds(brandIds, page, sort).subscribe(
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
    if (!brandIds.length) {
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
}
