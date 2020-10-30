import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PhoneModel } from 'src/app/models/phone-model.model';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.scss']
})
export class PhoneDetailComponent implements OnInit {

  brandName: string;
  phoneDetail: PhoneModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private titleService: Title,
    private common: CommonService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.brandName = params["brandName"];
        this.getPhoneDetails(Number(params["id"]));
      },
      error => {
        console.log("Error in activatedRoute > ", error);

      });
  }

  private getPhoneDetails(phoneId: number) {
    this.http.getPhoneDetails(phoneId).subscribe(
      response => {
        this.phoneDetail = response;
        this.phoneDetail.priceEur = this.common.getInrPrice(this.phoneDetail.priceEur);
        this.titleService.setTitle(`${this.brandName} ${this.phoneDetail.name} @ Rs.${this.phoneDetail.priceEur}`);
        this.common.setTagline(`${this.brandName} ${this.phoneDetail.name}`);
      },
      error => {
        console.log("Error while fetching phone details > ", error);
      }
    )
  }

}
