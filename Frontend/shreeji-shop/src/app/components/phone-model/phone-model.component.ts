import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { PhoneData } from '../home/home.model';

@Component({
  selector: 'app-phone-model',
  templateUrl: './phone-model.component.html',
  styleUrls: ['./phone-model.component.scss']
})
export class PhoneModelComponent implements OnInit {

  @Input() phoneResponse: Observable<PhoneData>;

  phones: any[] = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.phoneResponse.subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.phones = new Array();
          response.data.forEach(d => {
            d.model.forEach(m => {
              let phone = m;
              phone["brandName"] = d.brandName;
              phone.priceEur = this._getEurToInr(phone.priceEur);
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

  private _getEurToInr(priceEur: number): number {
    const inrAmt = 87;
    return priceEur * inrAmt;
  }

  openPhoneDetails(p: any) {
    console.log(p);
  }

}
