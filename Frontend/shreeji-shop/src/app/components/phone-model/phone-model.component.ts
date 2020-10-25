import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page.model';
import { PhoneModel } from 'src/app/models/phone-model.model';
import { HttpService } from 'src/app/services/http/http.service';
import { PhoneData } from '../home/home.model';

@Component({
  selector: 'app-phone-model',
  templateUrl: './phone-model.component.html',
  styleUrls: ['./phone-model.component.scss']
})
export class PhoneModelComponent implements OnInit {

  @Input() phoneResponse: Observable<PhoneData>;
  models: PhoneModel[] = [];
  
  constructor(private http: HttpService) { }

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
