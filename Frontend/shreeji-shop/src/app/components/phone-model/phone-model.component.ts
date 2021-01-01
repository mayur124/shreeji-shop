import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
import { BrandModelMap, PhoneData } from '../../models/home.model';

@Component({
  selector: 'app-phone-model',
  templateUrl: './phone-model.component.html',
  styleUrls: ['./phone-model.component.scss']
})
export class PhoneModelComponent implements OnInit {

  @Input() phoneResponse: Observable<PhoneData>;
  @Output() addToCart: EventEmitter<BrandModelMap> = new EventEmitter();

  phones: BrandModelMap[] = [];

  constructor(private router: Router,
    private common: CommonService,) { }

  ngOnInit(): void {
    this.phoneResponse.subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.phones = new Array();
          response.data.forEach(d => {
            let phone = d;
            phone.name = d["phoneName"];
            phone.priceEur = this.common.getInrPrice(Number(phone.priceEur));
            this.phones.push(phone);
          });
        }
      },
      (error) => {
        console.log("Error while getting phone data > ", error);
      }
    );
  }

  openPhoneDetails(phoneDetails: BrandModelMap) {
    this.router.navigate([]).then((_result: never) => { window.open(`/phone/${phoneDetails.brandName}/${phoneDetails.brandId}/${phoneDetails.phoneId}`, '_blank') });
  }

  emitAddToCart(phone: BrandModelMap) {
    this.addToCart.emit(phone);
  }

}
