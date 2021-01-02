import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SORT_TYPE } from 'src/app/constants/constants';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-tagline',
  templateUrl: './tagline.component.html',
  styleUrls: ['./tagline.component.scss']
})
export class TaglineComponent implements OnInit, AfterViewInit {

  @Input() tagLine: Observable<string>;
  @Output() applySort: EventEmitter<string> = new EventEmitter();

  // tagline: string = "Own your latest one";
  tagline: string;
  sortType: SORT_TYPE = "";

  constructor(private http: HttpService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tagLine?.subscribe(
      response => {
        this.tagline = response;
      },
      error => {
        console.log("Error in tagline watcher > ", error);
      });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  sortPhones() {
    this.applySort.emit(this.sortType);
  }

}
