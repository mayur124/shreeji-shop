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
  @Input() subTagLine: Observable<string>;
  @Output() applySort: EventEmitter<string> = new EventEmitter();

  taglineStr: string = "Own your latest one";
  subTaglineStr: string;
  sortType: SORT_TYPE = "";

  constructor(private http: HttpService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.tagLine?.subscribe(
      response => {
        this.taglineStr = response;
      },
      error => {
        console.log("Error in tagline watcher > ", error);
      });
    this.subTagLine?.subscribe(
      subTagLine => {
        this.subTaglineStr = subTagLine;
      },
      error => {
        console.log("Error in sub tagline watcher > ", error);
      }
    );
    this.cdr.detectChanges();
  }

  sortPhones() {
    this.applySort.emit(this.sortType);
  }

}
