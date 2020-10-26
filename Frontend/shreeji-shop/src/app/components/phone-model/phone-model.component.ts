import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
import { PhoneData } from '../home/home.model';

@Component({
  selector: 'app-phone-model',
  templateUrl: './phone-model.component.html',
  styleUrls: ['./phone-model.component.scss']
})
export class PhoneModelComponent implements OnInit {

  @Input() phoneResponse: Observable<PhoneData>;

  phones: any[] = [];

  constructor(private router: Router,
    private common: CommonService) { }

  ngOnInit(): void {
    this.phoneResponse.subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.phones = new Array();
          response.data.forEach(d => {
            d.model.forEach(m => {
              let phone = m;
              phone["brandName"] = d.brandName;
              phone.priceEur = this.common.getInrPrice(phone.priceEur);
              this.phones.push(phone);
            })
          });
        }
      },
      (error) => {
        console.log("Error while getting phone data > ", error);
      }
    )
  }

  openPhoneDetails(p: any) {
    this.router.navigate([`/phone/${p.brandName}/${p.id}`]);
  }

}
