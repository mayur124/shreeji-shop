import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneModel } from 'src/app/models/phone-model.model';
import { PhoneData } from '../home/home.model';

@Component({
  selector: 'app-phone-model',
  templateUrl: './phone-model.component.html',
  styleUrls: ['./phone-model.component.scss']
})
export class PhoneModelComponent implements OnInit {

  @Input() phoneResponse: Observable<PhoneData>;
  phoneData = new PhoneData();
  models: PhoneModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.phoneResponse.subscribe(
      (response) => {
        if (response.data.length > 0) {
          this.models = new Array();
          response.data.forEach(d => {
            d.model.forEach(m => {
              this.models.push(m);
            })
          });
        }
      },
      (error) => {
        console.log("Error while getting phone data > ", error);

      }
    )
  }

}
