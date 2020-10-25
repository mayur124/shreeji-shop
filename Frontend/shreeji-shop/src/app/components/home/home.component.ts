import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SORT_TYPE } from 'src/app/constants/constants';
import { Page } from 'src/app/models/page.model';
import { HttpService } from 'src/app/services/http/http.service';
import { PhoneData } from "./home.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phoneModelSubject: Subject<PhoneData> = new Subject();
  page: Page = new Page();
  currentPage: number = 0;

  constructor(private http: HttpService,) { }

  ngOnInit(): void {
    this.getDefaultPhones();
  }

  private getDefaultPhones(page?: number, sort?: SORT_TYPE) {
    this.http.getDefaultPhoneModels().subscribe(
      (response: PhoneData) => {
        this._setPaginationData(response.paginationData);
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }

  private getModelsForSelectedBrands(brandIds: string, page?: number, sort?: SORT_TYPE) {
    this.http.getPhoneModelsByBrandIds(brandIds).subscribe(
      (response: PhoneData) => {
        this._setPaginationData(response.paginationData);
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }

  private _setPaginationData(page: Page) {
    this.page = page;
    this.currentPage = 0;
  }

  getPhonesForSelectedBrandsSafe(brandIds: string) {
    if (!brandIds.length) {
      this.getDefaultPhones();
    } else {
      this.getModelsForSelectedBrands(brandIds);
    }
  }

  getPageNumArray() {
    return this.page ? [...Array(this.page.totalPage + 1).keys()] : [];
  }

  gotoPage(pageNo: number) {
    this.currentPage = pageNo;
    /**
     * if brands are selected
     *  call getModelsForSelectedBrands(brandIds, pagination, sort data)
     * else 
     *  call getDefaultPhones(pagination, sort data)
     */
  }

  private _isValidePageNo(pageNo: number) {
    return pageNo > 0 && pageNo < this.page.totalPage;
  }

  gotoPrevPage() {
    if (this._isValidePageNo(this.currentPage - 1)) {
      this.gotoPage(this.currentPage - 1);
    } else {
      this.gotoPage(0);
    }
  }

  gotoNextPage() {
    if (this._isValidePageNo(this.currentPage + 1)) {
      this.gotoPage(this.currentPage + 1);
    } else {
      this.gotoPage(this.page.totalPage);
    }
  }

}
