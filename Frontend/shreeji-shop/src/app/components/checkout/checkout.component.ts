import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartAndWishlistResponse } from 'src/app/models/transaction.model';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  cartItems: CartAndWishlistResponse[];
  tagLineSub: Subject<string> = new Subject();

  constructor(private common: CommonService,
    private cdr: ChangeDetectorRef,) { }
  ngOnInit(): void {
    this.cartItems = this.common.getCartItems();
  }
  ngAfterViewInit(): void {
    this.tagLineSub.next('Checkout');
    this.cdr.detectChanges();
  }
  getConvertedPrice(priceEur: number) {
    return this.common.getInrPrice(priceEur);
  }
}
