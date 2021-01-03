import { AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User, USER_ACTIONS } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent implements OnInit, AfterViewInit {

  tagLineSub: Subject<string> = new Subject();
  subTagLineSub: Subject<string> = new Subject();
  actionName: USER_ACTIONS;
  userDetails: User;
  @ViewChildren('template') templates: QueryList<TemplateRef<any>>;
  templateToActivate: TemplateRef<any>;

  constructor(private title: Title,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private cdr: ChangeDetectorRef,
    private router: Router,) { }

  ngOnInit(): void {
    this.http.getUserDetails().subscribe(
      userDetail => {
        this.userDetails = userDetail;
      },
      error => {
        console.log('Error while fetching user details > ', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.actionName = params['action'] ?? 'orders';
        this.initTemplate(this.actionName);
        this._changeHeadersBasedOnTemplate(this.actionName);
      }
    );
    this.cdr.detectChanges();
  }

  private _changeHeadersBasedOnTemplate(actionName: USER_ACTIONS) {
    switch (actionName) {
      default:
      case 'orders':
        this.title.setTitle('My orders');
        this.tagLineSub.next('My orders');
        this.subTagLineSub.next('List of your previous orders');
        break;
      case 'wishlist':
        this.title.setTitle('My wishlist');
        this.tagLineSub.next('My wishlist');
        this.subTagLineSub.next('List of items you added to the wishlist');
        break;
      case 'cart':
        this.title.setTitle('My cart');
        this.tagLineSub.next('My cart');
        this.subTagLineSub.next('List of phones you added to the cart');
        break;
      case 'profile':
        this.title.setTitle('My profile');
        this.tagLineSub.next('My profile');
        this.subTagLineSub.next('Update your profile details below');
        break;
    }
    this.router.navigate([`user/${actionName}`]);
  }

  initTemplate(actionName: USER_ACTIONS) {
    this._setCurrentAction(actionName);
    this.templateToActivate = this.templates.find(item => {
      const attrs: string[] = (<any>item)._declarationTContainer.attrs;
      return attrs.includes(actionName);
    });
    this._changeHeadersBasedOnTemplate(this.actionName);
  }

  private _setCurrentAction(action: USER_ACTIONS) {
    this.actionName = action;
  }

  updateUsername(newName: string) {
    if (newName.trim().length) {
      this.userDetails.name = newName;
    }
  }

}
