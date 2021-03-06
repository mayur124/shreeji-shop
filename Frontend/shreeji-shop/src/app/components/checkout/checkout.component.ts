import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AddOrderCartItem, AddOrderRequest, CartAndWishlistResponse } from 'src/app/models/transaction.model';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  cartItems: CartAndWishlistResponse[];
  totalPrice: number = 0;
  tagLineSub: Subject<string> = new Subject();
  subTagLineSub: Subject<string> = new Subject();
  subTagLinePositionSub: Subject<'left' | 'center'> = new Subject();
  shippingAddressForm: FormGroup;
  @ViewChild('progressSpan') progressSpan: ElementRef<HTMLElement>;

  constructor(private common: CommonService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpService,) { }

  ngOnInit(): void {
    this.cartItems = this.common.getCartItems();
    this._setTotalCount();
    this._initForm();
  }
  ngAfterViewInit(): void {
    this.tagLineSub.next('Checkout');
    this.subTagLineSub.next('Enter your shipping details');
    this.subTagLinePositionSub.next('left');
    this.cdr.detectChanges();
  }
  
  getCurrentINRValue() {
    return this.common.getCurrentINRValue();
  }

  private _setTotalCount() {
    this.totalPrice = this.cartItems?.reduce((prev, curr) => {
      prev += curr.priceEur * curr.quantity
      return prev;
    }, 0);
  }
  private _initForm() {
    this.shippingAddressForm = new FormGroup({
      name: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),
      address: new FormControl("", Validators.required),
      pinCode: new FormControl("", [Validators.required, Validators.pattern(/^\d{6}$/)]),
    });
  }

  private _validateForm(form: FormGroup) {
    const formControls = Object.keys(form.controls);
    for (let i = 0; i < formControls.length; i++) {
      const element: string = formControls[i];
      if (!form.get(element).valid) {
        form.get(element).markAsTouched();
        break;
      }
    }
  }

  placeOrder() {
    this._hideProgressMessage();
    this._validateForm(this.shippingAddressForm);
    if (this.shippingAddressForm.valid) {
      const username = localStorage.getItem('username');
      const itemList = this.cartItems.map(item => new AddOrderCartItem(item.brandId, item.modelId, item.quantity || 1));
      const order = new AddOrderRequest(username, itemList);
      this.common.setSpanMessage(this.progressSpan.nativeElement, 'Placing your order...');
      this.common.setSpanType(this.progressSpan.nativeElement, 'progress');
      this.http.addOrder(order).subscribe(
        (orderResponse) => {
          if (orderResponse) {
            this.common.setSpanMessage(this.progressSpan.nativeElement, 'Order placed successfuly!');
            this.common.setSpanType(this.progressSpan.nativeElement, 'success');
            setTimeout(() => {
              this._hideProgressMessage();
              this.router.navigate(['/user/orders']);
            }, 1000);
          } else {
            this._handleFailedResponse();
          }
        },
        (error) => {
          console.log('Error while adding order > ', error);
          this._handleFailedResponse();
        });
    }
  }

  cancel() {
    this.router.navigate(['user/cart']);
  }

  private _handleFailedResponse() {
    this.common.setSpanMessage(this.progressSpan.nativeElement, 'Order not placed! Please try again');
    this.common.setSpanType(this.progressSpan.nativeElement, 'error');
  }

  private _hideProgressMessage() {
    this.common.hideElement(this.progressSpan.nativeElement);
  }
}
