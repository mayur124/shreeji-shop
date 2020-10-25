import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginationResponse: Observable<{ brandIds: string, paginationData: Page }>
  @Output() paginationReq: EventEmitter<{ isBrandsSelected: boolean, pageNo: number }> = new EventEmitter();

  page: Page = new Page();
  currentPage: number = 0;
  brandIds: string;

  constructor() { }

  ngOnInit(): void {
    this.paginationResponse.subscribe(
      (response) => {
        this.brandIds = response.brandIds;
        this.page = response.paginationData;
      },
      (error) => {
        console.log("Error in pageinationResponse child-comp > ", error);
      }
    )
  }

  getPageNumArray() {
    return this.page ? [...Array(this.page.totalPage + 1).keys()] : [];
  }

  gotoPage(pageNo: number) {
    this.currentPage = pageNo;
    if (this.brandIds.length > 0) {
      this.paginationReq.emit({ isBrandsSelected: false, pageNo });
    } else {
      this.paginationReq.emit({ isBrandsSelected: true, pageNo });
    }
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
