import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit, AfterViewInit {

  tagLineSub: Subject<string> = new Subject();
  actionName: string;
  private _tagLineSubject: Subject<string> = new Subject();

  constructor(private title: Title,
    private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.actionName = params['action'] ?? 'orders';
        switch (this.actionName?.toLowerCase()) {
          default:
          case 'orders':
            this.title.setTitle('My orders');
            this.tagLineSub.next('My orders');
            break;
          case 'wishlist':
            this.title.setTitle('My wishlist');
            this.tagLineSub.next('My wishlist');
            break;
          case 'profile':
            this.title.setTitle('My profile');
            this.tagLineSub.next('My profile');
            break;
          case 'cart':
            this.title.setTitle('My cart');
            this.tagLineSub.next('My cart');
            break;
        }
      }
    );
  }

  ngOnInit(): void {

  }

}
