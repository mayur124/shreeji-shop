import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneData } from '../home/home.model';

@Component({
  selector: 'app-phone-model',
  templateUrl: './phone-model.component.html',
  styleUrls: ['./phone-model.component.scss']
})
export class PhoneModelComponent implements OnInit {

  @Input() phoneResponse: Observable<PhoneData>;
  phoneData = new PhoneData()

  constructor() { }

  ngOnInit(): void {
    this.phoneResponse.subscribe(
      (response) => {
        this.phoneData = response;
      },
      (error) => {
        console.log("Error while getting phone data > ", error);

      }
    )
  }

}
