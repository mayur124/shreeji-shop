import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SORT_TYPE } from 'src/app/constants/constants';
import { Page } from 'src/app/models/page.model';
import { PriceRange } from 'src/app/models/priceRange.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { BrandModelMap, PhoneData } from "../../models/home.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  phoneModelSubject: Subject<PhoneData> = new Subject();
  paginationSub: Subject<{ brandIds: string, paginationData: Page }> = new Subject();
  tagLineSub: Subject<string> = new Subject();

  brandIds: string;
  sortType: SORT_TYPE;
  pageNo: number;
  priceRange: PriceRange;

  constructor(private http: HttpService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.tagLineSub.next('Own your latest one');
  }

  private getDefaultPhones() {
    this.http.getDefaultPhoneModels(this.pageNo, this.sortType, this.priceRange).subscribe(
      (response: PhoneData) => {
        this.paginationSub.next({ brandIds: '', paginationData: response.paginationData });
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }
  private getModelsForSelectedBrands(brandIds: string) {
    this.http.getPhoneModelsByBrandIds(brandIds, this.pageNo, this.sortType, this.priceRange).subscribe(
      (response: PhoneData) => {
        this.paginationSub.next({ brandIds: brandIds, paginationData: response.paginationData });
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }
  getPhonesForSelectedBrandsSafe(brandIds?: string) {
    this.brandIds = brandIds;
    if (!brandIds || !brandIds.length) {
      this.getDefaultPhones();
    } else {
      this.getModelsForSelectedBrands(brandIds);
    }
  }
  performPagination(event: { isBrandsSelected: boolean, pageNo: number }) {
    this.pageNo = event.pageNo;
    if (event.isBrandsSelected) {
      this.getDefaultPhones();
    } else {
      this.getModelsForSelectedBrands(this.brandIds);
    }
  }
  sortPhones(sortType: SORT_TYPE) {
    this.sortType = sortType;
    this.getPhonesForSelectedBrandsSafe(this.brandIds);
  }
  setPriceRange(priceRange: PriceRange) {
    this.priceRange = priceRange;
    this.getPhonesForSelectedBrandsSafe(this.brandIds);
  }
  authenticatekAndAddToCart(phone: BrandModelMap) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["authenticate"], { relativeTo: this.activatedRoute });
    } else {
      this.http.addToCart(phone).subscribe(
        (cartResponse) => {
          if (cartResponse) {
            console.log('Phone added succussfully in cart > ', cartResponse);
          } else {
            console.log('Phone not added to cart {empty response}');
          }
        },
        (error) => {
          console.log('Error while adding phone to cart > ', error);
        }
      );
    }
  }
}
