import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { PhoneData } from "./home.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  phoneModelSubject: Subject<PhoneData> = new Subject();

  constructor(private http: HttpService,) { }

  ngOnInit(): void {
    this.getDefaultPhones();
  }

  private getDefaultPhones() {
    this.http.getDefaultPhoneModels().subscribe(
      (response: PhoneData) => {
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }

  getModelsForSelectedBrandsSafe(brandIds: string) {
    if (!brandIds.length) {
      this.getDefaultPhones();
    } else {
      this.getModelsForSelectedBrands(brandIds);
    }

  }

  getModelsForSelectedBrands(brandIds: string) {
    this.http.getPhoneModelsByBrandIds(brandIds).subscribe(
      (response: PhoneData) => {
        this.phoneModelSubject.next(response);
      },
      (error: any) => {
        console.log("Error while fetching model data > ", error);
      }
    );
  }

}
