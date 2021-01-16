import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BrandModelMap, PhoneData } from 'src/app/models/home.model';
import { PhoneModel } from 'src/app/models/phoneModel.model';
import { Wishlist } from 'src/app/models/transaction.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit {

  @ViewChild('toaster') toaster: ElementRef<HTMLElement>;

  phoneModelSubject: Subject<PhoneData> = new Subject();
  brandName: string;
  phoneDetail: PhoneModel;
  phoneAttributes: { [category: string]: { [key: string]: string } } = {};
  tagLineSub: Subject<string> = new Subject();
  brandId: number;
  phoneId: number;
  toasterMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private titleService: Title,
    private common: CommonService,
    private auth: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.brandId = Number(params["brandId"]);
        this.phoneId = Number(params["id"]);
        this.brandName = params["brandName"];
        this._getSimilarPhones(this.brandId, this.phoneId);
        this._setPhoneDetails(this.phoneId);
      },
      error => {
        console.log("Error in activatedRoute > ", error);
      });
  }

  private _getSimilarPhones(brandId: number, phoneId: number) {
    this.http.getSimilarPhones(brandId, phoneId).subscribe(
      response => {
        if (response.length > 0) {
          this.phoneModelSubject.next({ data: response, paginationData: null });
        }
      },
      error => {
        console.log("Error while getting similar phones > ", error);
      });
  }

  private _setPhoneDetails(phoneId: number) {
    this.http.getPhoneDetails(phoneId).subscribe(
      response => {
        this.phoneDetail = response;
        this.phoneDetail.priceEur = this.common.getInrPrice(this.phoneDetail.priceEur);
        this.titleService.setTitle(`${this.brandName} ${this.phoneDetail.name} @ Rs.${this.phoneDetail.priceEur}`);
        this.tagLineSub.next(`${this.brandName} ${this.phoneDetail.name}`);
        this._setPhoneAttributes(this.phoneDetail);
      },
      error => {
        console.log("Error while fetching phone details > ", error);
      }
    );
  }

  private _setPhoneAttributes(phoneData: PhoneModel) {
    this.phoneAttributes["general"] = {
      "ram": phoneData.ram,
      "battery": phoneData.battery,
      "bluetooth": phoneData.bluetooth,
      "chipset": phoneData.chipset,
      "colors": phoneData.colors,
      "cpu": phoneData.cpu,
      "gpu": phoneData.gpu,
      "operating system": phoneData.os,
      "price": `Rs.${phoneData.priceEur}`,
      "sensors": phoneData.sensors,
      "speaker": phoneData.speaker,
      "usb": phoneData.usb,
      "weight in grams": phoneData.weightG,
    };
    this.phoneAttributes["display"] = {
      "dimensions": phoneData.dimensions,
      "display resolution": phoneData.displayResolution,
      "display size": phoneData.displaySize,
      "display type": phoneData.displayType,
    };
    this.phoneAttributes["camera"] = {
      "primary camera": phoneData.primaryCamera,
      "secondary camera": phoneData.secondaryCamera,
    };
    this.phoneAttributes["storage"] = {
      "internal memory": phoneData.internalMemory,
      "memory card": phoneData.memoryCard,
    }
    this.phoneAttributes["network"] = {
      "2g bands": phoneData.bands2g,
      "3g bands": phoneData.bands3g,
      "4g bands": phoneData.bands4g,
      "edge": phoneData.edge,
      "gprs": phoneData.gprs,
      "gps": phoneData.gps,
      "network speed": phoneData.networkSpeed,
      "network technology": phoneData.networkTechnology,
      "sim": phoneData.sim,
      "wlan": phoneData.wlan,
    }
  }

  addToCartDetailBtn() {
    const phone = new BrandModelMap;
    phone.phoneId = this.phoneId;
    phone.brandId = this.brandId;
    this.addToCartWithAuth(phone);
  }

  addToCartWithAuth(phone: BrandModelMap) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["authenticate"], { relativeTo: this.activatedRoute });
    } else {
      this.http.addToCart(phone).subscribe(
        (cartResponse) => {
          if (cartResponse) {
            this._showToaster('Phone added in the cart');
            console.log('Phone successfully added in the cart > ', cartResponse);
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
  addToWishlistWithAuth(wishlist: Wishlist) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(["authenticate"], { relativeTo: this.activatedRoute });
    } else {
      this.http.addToWishlist(wishlist).subscribe(
        (wishlist) => {
          this._showToaster('Phone added in the wishlist');
          console.log('Phone added succussfully in wishlist > ', wishlist);
        },
        (error) => {
          console.log('Error while adding phone to wishlist > ', error);
        }
      );
    }
  }
  private _showToaster(message: string) {
    this.toasterMessage = message;
    this.toaster.nativeElement.classList.add('show');
    setTimeout(() => {
      this.toaster.nativeElement.classList.remove('show');
    }, 2500);
  }
}
