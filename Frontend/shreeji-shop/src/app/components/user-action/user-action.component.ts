import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit {

  tagLineSub: Subject<string> = new Subject();
  constructor() { }

  ngOnInit(): void {
    this.tagLineSub.next('User actions');
  }

}
