import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SORT_TYPE } from 'src/app/constants/constants';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-tagline',
  templateUrl: './tagline.component.html',
  styleUrls: ['./tagline.component.scss']
})
export class TaglineComponent implements OnInit {

  @Input() tagLine: Observable<string>;
  @Output() applySort: EventEmitter<string> = new EventEmitter();

  tagline: string = "Own your latest one";
  sortType: SORT_TYPE = "";

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.tagLine?.subscribe(
      response => {
        this.tagline = response;
      },
      error => {
        console.log("Error in tagline watcher > ", error);
      });
  }

  sortPhones() {
    this.applySort.emit(this.sortType);
  }

}
